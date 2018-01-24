const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const http = require('http').Server(app);
// const io = require('socket.io')(http);

var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render(__dirname + '/../client/static/index.handlebars', {
        test_var:"test123",
        hello_world:"hello_world"
    });
});

console.log(path.join(__dirname  + '../../../dist'));
app.get('/assets/viewer.js', function (req, res) {
    res.sendFile(path.join(__dirname  + '../../../dist/viewer.js'))
});

/* io.on('connection', function(socket){
    let name = Math.random();
    console.log(`a user connected ${name}`);
    socket.on('disconnect', function(){
        console.log(`a user disconnected ${name}`);
    });
}); */

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});