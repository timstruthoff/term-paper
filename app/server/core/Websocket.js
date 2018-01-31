const Player = require('./../components/Player');

module.exports = class {

    constructor (server) {

        var io = require('socket.io')(server);
    
        io.on('connection', function (socket) {
        
            console.log('client connected');
        
            socket.on('message', function (data) {
                console.log(data);
            });

            socket.on('event', function(eventObj){
                socket.emit('viewerEvent', eventObj);
            });
        });
    }
}