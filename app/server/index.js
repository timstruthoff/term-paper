const CONFIG = require('./config');

const path = require('path');
const http = require('http');

const express = require('express');
const app = express();

const Websocket = require('./../../app/server/core/Websocket');
const Rx = require('./../../app/server/core/Rx');

app.use('/', express.static(path.join(__dirname, './../../dist/')));

console.log(path.resolve(path.join(__dirname, './../../dist/')))

var server = http.Server(app);

var websocket = new Websocket(server);
var rx = new Rx(websocket);

server.listen(CONFIG.PORT, function () {
    console.log(`Listening on port ${CONFIG.PORT}!`);
});