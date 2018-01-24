const http = require('http');
const express = require('express');
const app = express();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./../webpack/webpack.config.js');
const compiler = webpack(config);

const Websocket = require('./../../app/server/core/Websocket');


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

var server = require('http').Server(app);

var websocket = new Websocket(server);

server.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});