# FlightFabric 0.13.3 · Public Alpha

## [Download for Windows (.exe)](https://github.com/yenbuilds/flight-fabric/releases/download/v0.13.3/FlightFabric.Setup.0.13.3.exe)

**Public alpha · Free · Windows 64-bit · Microsoft Flight Simulator 2024**

Still in development. Expect bugs and incomplete aircraft support.

Finish your flight before updating. Check **Settings > About** for desktop
updates, or choose **Quit FlightFabric** from the system tray and run the
installer above. Your settings and recordings stay in their current locations.
Users on 0.12.1 or earlier need the manual installer.

To update the MSFS toolbar, close MSFS, open **Settings > Devices > MSFS 2024
toolbar panel**, choose **Update** or **Reinstall**, then restart the simulator.

## What's new

- **Phone CDU:** improve keypad fit around browser controls and screen edges, keeping keys reachable on shorter screens.
- **Taxi and pushback:** fix shared airport-data loading, keep useful errors visible during retries, and clear errors when changing aircraft.
- **Fenix A320:** fix taxi/pushback dimension loading when aircraft files are spread across shared packages.
- **PMDG 777:** add HDG/TRK SEL by button or voice, and keep MCP buttons disabled while their commands are pending.

<details>
<summary><strong>More improvements</strong></summary>

### PMDG 777 heading selection

Use **HDG/TRK SEL** or say **"engage heading select"** to request the selected
heading or track mode. **HDG HOLD** remains a separate control. The request
preserves the heading/track reference and selected target.

### Taxi and pushback feedback

The app and MSFS toolbar retain the reason a pushback preview is unavailable
while retrying. Switching aircraft clears errors left by the previous aircraft.

</details>

<details>
<summary><strong>Known limitations</strong></summary>

Aircraft support is still developing, and not every command has been verified
in a live simulator session. An unconfirmed approach-selection message does not
establish that the aircraft captured the approach; check the flight mode annunciator.
The PMDG 737 Mach target control requires the cockpit speed window to be in Mach mode.
The new PMDG 777 heading/track select request remains unverified in a live
simulator session. Its result confirms the request was sent, not that SEL mode
engaged; the SDK does not provide an independent SEL indication.

Pushback and Autotaxi remain experimental and depend on the aircraft and airport
scenery. Some stands still require the simulator's pushback controls. Voice
recognition depends on your microphone, accent and background noise. Controller
compatibility varies; reconnecting a device may require selecting its button again.

The iniBuilds A380 integration is partial. A350 surface controls have ground
checks on the -1000; the -900, airborne operation and automatic braking remain
unverified. MD-11 surface controls have limited ground checks on the PW4462;
its added flight-guidance buttons still need live verification.

Desktop 3D maps require compatible graphics support and online imagery services.
Phone and tablet control requires pairing on the simulator PC. MSFS 2020 and
X-Plane are not currently supported.

</details>

<details>
<summary><strong>Installation help and optional file verification</strong></summary>

Download `FlightFabric.Setup.0.13.3.exe`. GitHub's **Source code** archives are for
developers; the installer is all you need to use FlightFabric.

The current alpha is unsigned, so Windows may show **Windows protected your
PC**. Select **More info**, check for `FlightFabric.Setup.0.13.3.exe` with **Unknown
publisher**, and select **Run anyway** only if you downloaded it from the
official link above. If that option is unavailable or Windows reports a threat,
stop and report the warning; do not disable Windows security protections.

GitHub shows the installer's SHA-256 checksum beside the file in **Assets**.

</details>

[Getting started](https://github.com/yenbuilds/flight-fabric#readme) ·
[Licence](https://github.com/yenbuilds/flight-fabric/blob/v0.13.3/LICENSE.md) ·
[Third-party notices](https://github.com/yenbuilds/flight-fabric/blob/v0.13.3/THIRD_PARTY_NOTICES.md)

Thank you to everyone supporting FlightFabric through feedback, testing and donations.
