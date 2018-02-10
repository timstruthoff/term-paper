const http = require('http');
const express = require('express');
const app = express();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./../webpack/webpack.config.js');
const compiler = webpack(config);

const Websocket = require('./../../app/server/core/Websocket');
const Rx = require('./../../app/server/core/Rx');


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

// hot reloading
app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

var server = require('http').Server(app);

var websocket = new Websocket(server);
var rx = new Rx(websocket);

server.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});