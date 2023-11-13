# chat-app

Simple chat app with ReactJS, Express, MongoDB

# Prerequirements

You are required to have this software installed on your server or local machine.

1. [NPM](https://www.npmjs.com/package/npm)
2. [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community)

# Setup

## Clone and install

```sh
$ https://github.com/Iwwww/chat-app.git
$ cd chat-app/
$ npm install
```

## Configure enviroment variables

Rename `[env.example](server/env.example)` to `.env` and `[env.development.example](client/env.development.example)` to `.env.development`

```sh
$ cp server/env.example server/.env
$ cp client/env.development.example client/.env.development
```

## Start server and client

- _Don't foget to start MongoDB server before start server_

```sh
$ npm run start-server
$ npm run start-client
```
