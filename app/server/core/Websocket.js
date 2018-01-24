module.exports = class {

    constructor (server) {

        var io = require('socket.io')(server);
    
        io.on('connection', function (socket) {
        
            console.log('client connected');
        
            socket.emit('message', {
                hello: 'server'
            });
        
            socket.on('message', function (data) {
                console.log(data);
            });
        });
    }
}