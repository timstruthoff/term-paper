const path = require('path');
const http = require('http');

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

const Websocket = require('./../../app/server/core/Websocket');
const Rx = require('./../../app/server/core/Rx');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render(__dirname + '/../client/static/index.handlebars', {
        test_var: "test123",
        hello_world: "hello_world"
    });
});

var server = http.Server(app);

var websocket = new Websocket(server);
var rx = new Rx(websocket);

server.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});