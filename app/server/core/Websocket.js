const Player = require('./../components/Player');

module.exports = class {

    constructor (server) {

        var io = require('socket.io')(server);
        
        this.connectObserver = (observer) => {

            io.on('connection', (socket) => {

                let msgObserver = (observer) => {
                    socket.on('msg', function (data) {
                        observer.next(data);
                    });
                }

                let disconnectObserver = (observer) => {
                    socket.on('disconnecting', (reason) => {
                        observer.next(reason);
                    });
                }

                let send = data => {
                    console.log('send');
                    socket.emit('msg', data)
                }

                observer.next({
                    msgObserver: msgObserver,
                    disconnectObserver: disconnectObserver,
                    send: send
                });
            });
        }
    }
}