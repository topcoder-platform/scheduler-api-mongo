# Topcoder Autopilot Scheduler API

It provides an API to create event in scheduler.
It also proivdes a script to create events.

## Prerequisites

- NodeJS (v10)
- Mongodb 4.2

## Configuration

Configuration for the application is at `config/default.js`.
The following parameters can be set in config file or in env variables:

- LOG_LEVEL: the log level
- PORT: the server port
- API_VERSION: the API version, used as API path prefix
- MONGODB_URI: Mongo DB URI

## Local Deployment

- Install dependencies `npm install`
- Run lint `npm run lint`
- Run lint fix `npm run lint:fix`
- Start app `npm start`
- App is running at `http://localhost:3000`
- To create events `npm run create-events`, this should run after the REST API app is started, because it calls the REST API to create events
