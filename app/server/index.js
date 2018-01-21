const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render(__dirname + '/index.handlebars', {
        test_var:"test123",
        hello_world:"hello_world"
    });
});

io.on('connection', function(socket){
    let name = Math.random();
    console.log(`a user connected ${name}`);
    socket.on('disconnect', function(){
        console.log(`a user disconnected ${name}`);
    });
});

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});