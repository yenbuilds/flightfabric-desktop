'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { EventEmitter } = require('node:events');
const { runBrowserProcess } = require('./test-app-workbench-browser');

function childFixture() {
  const child = new EventEmitter();
  let profile, timeout, cancelled = false, killed = false;
  child.kill = () => { killed = true; };
  const options = {
    spawn(_command, _args, { env }) {
      profile = env.FF_WORKBENCH_USER_DATA;
      fs.writeFileSync(path.join(profile, 'cache'), 'temporary browser data');
      return child;
    },
    schedule(callback) { timeout = callback; return 42; },
    cancel(timer) { assert.equal(timer, 42); cancelled = true; },
  };
  return { child, options, get profile() { return profile; }, expire() { timeout(); },
    get cancelled() { return cancelled; }, get killed() { return killed; } };
}

test('workbench profiles are removed after successful and failed browser closure', async () => {
  for (const code of [0, 1]) {
    const fixture = childFixture();
    const pending = runBrowserProcess('http://127.0.0.1/fixture', fixture.options);
    assert(fs.existsSync(fixture.profile));
    fixture.child.emit('exit', code);
    await Promise.resolve();
    assert(fs.existsSync(fixture.profile), 'exit alone must not release the profile');
    fixture.child.emit('close', code);
    if (code) await assert.rejects(pending, /workbench browser checks/);
    else await pending;
    assert(!fs.existsSync(fixture.profile));
    assert(fixture.cancelled);
  }
});

test('timeout waits for closure and cannot remove another browser session profile', async () => {
  const first = childFixture(), second = childFixture();
  const pending = runBrowserProcess('http://127.0.0.1/fixture', first.options);
  const other = runBrowserProcess('http://127.0.0.1/fixture', second.options);
  first.expire();
  assert(first.killed);
  assert(fs.existsSync(first.profile));
  first.child.emit('close', null);
  await assert.rejects(pending, /exceeded/);
  assert(!fs.existsSync(first.profile));
  assert(fs.existsSync(second.profile));
  second.child.emit('close', 0);
  await other;
  assert(!fs.existsSync(second.profile));
});

test('spawn errors settle after close and release the temporary profile', async () => {
  const fixture = childFixture();
  const pending = runBrowserProcess('http://127.0.0.1/fixture', fixture.options);
  fixture.child.emit('error', new Error('fixture spawn failed'));
  fixture.child.emit('close', -1);
  await assert.rejects(pending, /fixture spawn failed/);
  assert(!fs.existsSync(fixture.profile));
  assert(fixture.cancelled);
});
