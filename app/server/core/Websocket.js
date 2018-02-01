const Player = require('./../components/Player');

module.exports = class {

    constructor (server) {

        var io = require('socket.io')(server);
        
        this.connectObserver = (observer) => {

            
            io.on('connection', (socket) => {
                
                let initListener = data => {
                    
                    // Listening only for init messages.
                    if (typeof data == 'object' && data.eventType == 'init') {
                        
                        // Removing listener for init messages.
                        socket.removeListener('msg', initListener);
                        
                        // Determine wether client is viewer or controller.
                        let clientType = null;
                        switch (data.clientType) {
                            case 'viewer':
                                clientType = 'viewer';
                                break;
                            case 'controller':
                                clientType = 'controller';
                                break;
                        }

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
                            console.log('send to:');
                            console.log(clientType);
                            socket.emit('msg', data)
                        }
        
                        observer.next({
                            msgObserver: msgObserver,
                            disconnectObserver: disconnectObserver,
                            clientType: clientType,
                            send: send
                        });
                    }
                };

                // Attaching listener for init messages.
                socket.on('msg', initListener)

                
            });
        }
    }
}