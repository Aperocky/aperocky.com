# bepr

`bepr` is a tiny authenticated client/server reverse shell program over outbound WebSocket connections.

I created `bepr` because I'm traveling and would like to control computers at home without exposing them to the public internet, and always recover in the case of internet or power outage. This only requires a domain (for TLS) and a micro cloud server to get working.

A single executable cover all 3 mode: server mode, client mode, and user mode. It is packaged as rpm, deb, and pkg and a systemd service for linux and launchd service for macos, it comes in 1MB.

[Github link](https://github.com/Aperocky/bepr)

[Releases link](https://github.com/Aperocky/bepr/releases)

<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="900" viewBox="0 0 1500 900" role="img" aria-labelledby="title desc">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 8 4 L 0 8 z" fill="#243447"/>
    </marker>
    <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 8 4 L 0 8 z" fill="#1d4ed8"/>
    </marker>
    <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 8 4 L 0 8 z" fill="#15803d"/>
    </marker>
    <marker id="arrow-green-start" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto" markerUnits="strokeWidth">
      <path d="M 8 0 L 0 4 L 8 8 z" fill="#15803d"/>
    </marker>
    <marker id="arrow-start" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto" markerUnits="strokeWidth">
      <path d="M 8 0 L 0 4 L 8 8 z" fill="#243447"/>
    </marker>
    <style>
      text {
        font-family: Helvetica, Arial, sans-serif;
        fill: #1f2933;
      }
      .title {
        font-size: 34px;
        font-weight: 700;
      }
      .subtitle {
        font-size: 17px;
        fill: #52606d;
      }
      .host-title {
        font-size: 24px;
        font-weight: 700;
      }
      .section {
        font-size: 18px;
        font-weight: 700;
      }
      .body {
        font-size: 15px;
        fill: #3e4c59;
      }
      .code {
        font-family: Menlo, Consolas, monospace;
        font-size: 14px;
        fill: #1f2933;
      }
      .tiny {
        font-size: 13px;
        fill: #52606d;
      }
      .server-host {
        fill: #eef6ff;
        stroke: #2563eb;
        stroke-width: 2;
      }
      .operator-host {
        fill: #fff7ed;
        stroke: #ea580c;
        stroke-width: 2;
      }
      .client-host {
        fill: #ecfdf3;
        stroke: #16a34a;
        stroke-width: 2;
      }
      .internet {
        fill: #f8fafc;
        stroke: #94a3b8;
        stroke-width: 2;
        stroke-dasharray: 10 8;
      }
      .card {
        fill: #ffffff;
        stroke: #9aa5b1;
        stroke-width: 1.5;
      }
      .server-card {
        fill: #dbeafe;
        stroke: #2563eb;
      }
      .operator-card {
        fill: #ffedd5;
        stroke: #ea580c;
      }
      .client-card {
        fill: #dcfce7;
        stroke: #16a34a;
      }
      .shell-card {
        fill: #f0fdf4;
        stroke: #65a30d;
      }
      .note {
        fill: #ffffff;
        stroke: #cbd5e1;
        stroke-width: 1.2;
      }
      .arrow {
        fill: none;
        stroke: #243447;
        stroke-width: 3;
        marker-end: url(#arrow);
      }
      .blue-arrow {
        fill: none;
        stroke: #1d4ed8;
        stroke-width: 3;
        marker-end: url(#arrow-blue);
      }
      .green-arrow {
        fill: none;
        stroke: #15803d;
        stroke-width: 3;
        marker-end: url(#arrow-green);
      }
      .green-bidir {
        fill: none;
        stroke: #15803d;
        stroke-width: 3;
        marker-start: url(#arrow-green-start);
        marker-end: url(#arrow-green);
      }
      .bidir {
        fill: none;
        stroke: #243447;
        stroke-width: 3;
        marker-start: url(#arrow-start);
        marker-end: url(#arrow);
      }
      .dash {
        stroke-dasharray: 9 7;
      }
    </style>
  </defs>
  <rect width="1500" height="760" fill="#f7f7f7"/>
  <text class="title" x="750" y="55" text-anchor="middle">bepr connection model</text>
  <text class="subtitle" x="750" y="84" text-anchor="middle">one bepr executable: server mode, client mode, and user mode with configuration</text>
  <text class="subtitle" x="750" y="108" text-anchor="middle">client dials out to server, user can connect via server for direct shell access</text>
  <rect class="operator-host" x="20" y="210" width="315" height="340" rx="12"/>
  <text class="host-title" x="178" y="250" text-anchor="middle">user host</text>
  <text class="tiny" x="178" y="274" text-anchor="middle">remote or local</text>
  <rect class="note" x="55" y="292" width="245" height="54" rx="8"/>
  <text class="body" x="178" y="315" text-anchor="middle">private key stays on user host</text>
  <text class="code" x="178" y="337" text-anchor="middle">~/.ssh/bepr_user_ed25519</text>
  <rect class="card operator-card" x="55" y="364" width="245" height="78" rx="8"/>
  <text class="section" x="178" y="394" text-anchor="middle">bepr user mode</text>
  <text class="code" x="178" y="420" text-anchor="middle">bepr connect pi_zero</text>
  <rect class="note" x="55" y="458" width="245" height="52" rx="8"/>
  <text class="section" x="178" y="479" text-anchor="middle">user config</text>
  <text class="code" x="178" y="500" text-anchor="middle">~/.config/bepr/user.conf</text>
  <rect class="server-host" x="430" y="130" width="430" height="515" rx="12"/>
  <text class="host-title" x="645" y="172" text-anchor="middle">server host</text>
  <rect class="card" x="475" y="184" width="340" height="70" rx="8"/>
  <text class="body" x="645" y="204" text-anchor="middle">public keys copied to server</text>
  <text class="code" x="645" y="224" text-anchor="middle">/etc/bepr/keys/pi_zero.pub</text>
  <text class="code" x="645" y="244" text-anchor="middle">/etc/bepr/user-keys/aperocky.pub</text>
  <rect class="client-host" x="1040" y="130" width="410" height="515" rx="12"/>
  <text class="host-title" x="1245" y="172" text-anchor="middle">client host</text>
  <rect class="internet" x="885" y="210" width="130" height="350" rx="12"/>
  <text class="section" x="950" y="245" text-anchor="middle">internet</text>
  <text class="body" x="950" y="270" text-anchor="middle">outbound</text>
  <text class="body" x="950" y="293" text-anchor="middle">only</text>
  <rect class="card server-card" x="475" y="279" width="340" height="146" rx="8"/>
  <line x1="475" y1="378" x2="815" y2="378" stroke="#64748b" stroke-width="1.5" stroke-dasharray="8 5" opacity="0.55"/>
  <text class="tiny" x="810" y="373" text-anchor="end" fill="#64748b">bridge</text>
  <line x1="645" y1="378" x2="645" y2="425" stroke="#64748b" stroke-width="1.5" stroke-dasharray="8 5" opacity="0.55"/>
  <text class="section" x="645" y="309" text-anchor="middle">bepr server</text>
  <text class="code" x="645" y="337" text-anchor="middle">/etc/bepr/server.conf</text>
  <text class="code" x="645" y="361" text-anchor="middle">/bepr/client/&lt;client_id&gt;</text>
  <text class="code" x="645" y="385" text-anchor="middle">/bepr/user/&lt;user_id&gt;</text>
  <text class="body" x="645" y="409" text-anchor="middle">routes clients and users</text>
  <rect class="card operator-card" x="475" y="518" width="340" height="68" rx="8"/>
  <text class="section" x="645" y="544" text-anchor="middle">local command</text>
  <text class="code" x="645" y="568" text-anchor="middle">bepr connect pi_zero</text>
  <rect class="note" x="690" y="464" width="125" height="34" rx="8"/>
  <text class="code" x="753" y="486" text-anchor="middle">/tmp/bepr.sock</text>
  <rect class="note" x="1085" y="184" width="320" height="54" rx="8"/>
  <text class="body" x="1245" y="207" text-anchor="middle">private key stays on bepr client host</text>
  <text class="code" x="1245" y="229" text-anchor="middle">~/.ssh/bepr_client_ed25519</text>
  <rect class="card client-card" x="1085" y="272" width="320" height="120" rx="8"/>
  <text class="section" x="1245" y="307" text-anchor="middle">bepr client</text>
  <text class="code" x="1245" y="337" text-anchor="middle">/etc/bepr/client.conf</text>
  <text class="code" x="1245" y="363" text-anchor="middle">wss://server/bepr/client/pi_zero</text>
  <rect class="card shell-card" x="1085" y="425" width="320" height="120" rx="8"/>
  <text class="section" x="1245" y="460" text-anchor="middle">client shell</text>
  <text class="code" x="1245" y="490" text-anchor="middle">/bin/sh</text>
  <text class="body" x="1245" y="516" text-anchor="middle">stdin/stdout/stderr are piped</text>
  <path class="green-arrow dash" d="M 645 254 L 645 275"/>
  <text class="tiny" x="668" y="269">authorizes client and user IDs</text>
  <path class="green-arrow" d="M 1085 307 C 1020 307, 1000 345, 950 345 C 900 345, 870 340, 815 340"/>
  <rect class="note" x="820" y="352" width="260" height="72" rx="8"/>
  <text class="section" x="950" y="378" text-anchor="middle">1. outbound client WebSocket</text>
  <text class="tiny" x="950" y="401" text-anchor="middle">client signs server challenge</text>
  <path class="bidir" d="M 645 518 L 645 425"/>
  <path class="bidir" d="M 300 403 C 390 403, 445 378, 475 378"/>
  <path class="bidir" d="M 815 378 C 930 470, 1015 470, 1085 485"/>
  <rect class="note" x="810" y="592" width="290" height="72" rx="8"/>
  <text class="section" x="955" y="618" text-anchor="middle">2. raw bidirectional stream</text>
  <text class="tiny" x="955" y="641" text-anchor="middle">user terminal &lt;-&gt; client shell</text>
  <path class="green-arrow" d="M 178 346 L 178 364"/>
  <text class="tiny" x="212" y="359">bepr user mode signs with private key</text>
  <path class="green-arrow" d="M 1245 238 L 1245 272"/>
  <text class="tiny" x="1258" y="257" text-anchor="start">bepr client signs with private key</text>
</svg>

## Installation

Go to https://github.com/Aperocky/bepr/releases to find the version of the package for your platform. download it and use these command to install

```sh
sudo installer -pkg bepr-<version>.pkg -target /
sudo dpkg -i bepr_<version>_<arch>.deb
sudo rpm -i bepr-<version>-<arch>.rpm
```

Or use [update scripts](https://github.com/Aperocky/bepr/tree/main/packaging/scripts) to automatically install it by running the script:

```
curl -fsSL https://raw.githubusercontent.com/Aperocky/bepr/main/packaging/scripts/update-deb.sh | sh
curl -fsSL https://raw.githubusercontent.com/Aperocky/bepr/main/packaging/scripts/update-macos.sh | sh
curl -fsSL https://raw.githubusercontent.com/Aperocky/bepr/main/packaging/scripts/update-rpm.sh | sh
```

And now, depending on what your machine is for, configure each host. The binary works in all three modes but does not sync automatically — set up before you leave. Once configured with config, the service will always attempt to restart in current configuration in the case of outage/reboot.

**Server Mode**: runs as a service, establish persistent websocket connection from outbound request from client hosts.
**Client Mode**: runs as a service, establish connection with server and connects to shell.
**User Mode**: run only as invoked, connect to server and bridge to client.

### Server mode

You need your own TLS cert and domain; that part is not covered by `bepr`. Create the server config:

```txt
# cat /etc/bepr/server.conf
bind = 0.0.0.0:443
key_dir = /etc/bepr/client-keys
tls_cert = /etc/bepr/tls/cert.pem
tls_key  = /etc/bepr/tls/privkey.pem
```

Start the service:

linux:
```sh
sudo systemctl enable --now bepr
```

From the server you can list registered clients and connected users, this goes through a local socket.

```sh
root@server.example:~# bepr list
aperocky    user      disconnected
laptop      client    disconnected
mac_m1      client    connected
pi_zero     client    connected
```

You may also connect to a client directly with this local socket, this behave the same as the user mode.

```sh
bepr connect laptop
```

This offers user and client paths on your domain:

```
$domain/bepr/client/mac_m1 # Connect from client
$domain/bepr/user/aperocky # Connect from user
```

Once attached, the `bepr connect` terminal stdin/stdout is piped to the selected client shell. Client shells run inside a PTY, while the server is a raw pass-through byte router. Multiple clients may be connected to the server at the same time, but a single client can only have one user attached at a time.

### Client mode

On each client host, generate a key pair:

```sh
ssh-keygen -t ed25519 -f /etc/bepr/client-keys/pi_zero
```

Copy the public key to the server's `key_dir`:

```txt
/etc/bepr/client-keys/pi_zero.pub  -> client ID pi_zero on server
```

Create the client config. The client ID in the URL must match the public key filename on the server:

```txt
# cat /etc/bepr/client.conf
server = wss://server.example/bepr/client/pi_zero
private_key_path = /etc/bepr/client-keys/pi_zero
shell = /bin/sh
```

Start the service/daemon:

linux:
```sh
sudo systemctl enable --now bepr
```

mac:
```sh
sudo launchctl bootstrap system /Library/LaunchDaemons/com.bepr.plist
sudo launchctl enable system/com.bepr
sudo launchctl kickstart -k system/com.bepr
```

The legacy path `domain/bepr/$name` is also accepted for backwards compatibility with older clients. Start the service the same way as the server.

Note: the client spawns a shell immediately on connecting to the server, not when a user attaches. The shell runs persistently in the background. If you attach and find the terminal in a bad state, run `stty sane`. If the shell itself is unresponsive, kill it by PID on the client machine — the client will automatically reconnect and spawn a fresh shell within 10 seconds.

### User mode

To operate from a remote machine without SSH-forwarding the server socket, use user mode. On the server, add a `user_key_dir` to the server config:

```txt
# cat /etc/bepr/server.conf
bind = 0.0.0.0:443
key_dir = /etc/bepr/client-keys
user_key_dir = /etc/bepr/user-keys
tls_cert = /etc/bepr/tls/cert.pem
tls_key  = /etc/bepr/tls/privkey.pem
```

Copy the user's public key to the server:

```txt
/etc/bepr/user-keys/aperocky.pub  -> user ID aperocky
```

On the user machine, create a user config:

```txt
# cat ~/.config/bepr/user.conf
server = wss://server.example/bepr/user/aperocky
private_key_path = ~/.ssh/aperocky_user_ed25519
```

`bepr list` and `bepr connect` will use this config automatically with no extra flags. Your commands bridge from the server directly into client hosts.

## Run Manually or Test

`bepr` binary can be manually ran without service/packaging with direct commands and arguments:

```sh
./bepr server --config $server_config_path
./bepr client --config $client_config_path
./bepr connect --socket $socket_file_path $destination
```

### Security

bepr require TLS and upgrades websocket connection to `wss`. Data is encrypted during transit, between user to server, and server to the clients. The security posture assume you own both the server and the clients.
