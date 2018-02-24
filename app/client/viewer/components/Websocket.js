import io from 'socket.io-client';

export default class Websocket {

    constructor() {
        const socket = io();

        this.observerFunction = (observer) => {
            socket.on('connect', () => {

                socket.emit('msg', {
                    clientType: 'viewer',
                    eventType: 'init'
                });
                
                let msgObserver = (observer) => {
                    socket.on('msg', (data) => {
                        observer.next(data);    
                    });
                }

                observer.next({
                    stream: msgObserver
                });
            });
        }

    }
}