import io from 'socket.io-client';

export default class Websocket {

    constructor() {
        const socket = io('http://localhost:3000');

        this.observerFunction = (observer) => {
            socket.on('connect', () => {

                let msgObserver = (observer) => {
                    socket.on('message', (data) => {
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