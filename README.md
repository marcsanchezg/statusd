# About statusd

Statusd is a web application made with ExpressJS to manage network services status by adding its host and port to check for abailavility.

- [Creator's website](https://www.marcsanchezg.com).
- [Try systemd](https://systemd.marcsanchezg.com).

## Requirements

Statusd has small requirements as it's a small web application, the software tools you need installed in your system are:
- Git
- NodeJS
- npm

## Installation

First of all, clone this repo into your system:
```bash
$ git clone https://github.com/marcsanchezg/statusd.git
```

And then, change the directory to 'statusd' and then install Express with the following command:

```bash
$ cd statusd
$ npm install
$ npm install express
```

and now we have statusd installed

## Quick start

To start statusd, you need to be in the project's directory and start it with:
```bash
$ npm start
```

## Make it a system daemon

Create the file /lib/systemd/system/systemd.service with the following content
```bash
$ nano /lib/systemd/system/systemd.service

[Unit]
Description=Statusd system daemon
Documentation=https://github.com/marcsanchezg/statusd
After=network.target

[Service]
Type=simple
WorkingDirectory=/dir/to/systemd
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
And then enable and start the service via systemctl
```bash
$ sudo systemctl enable systemd.service
$ sudo systemctl start systemd.service
```
