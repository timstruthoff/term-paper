import io from 'socket.io-client';

export default class Websocket {

    constructor() {
        let socket = io('http://localhost:3000');
        this.socket = socket;

        socket.on('connect', () => {
            console.log('connected')

            socket.emit('msg', {
                clientType: 'controller',
                eventType: 'init'
            });

            /*setInterval( () => {
                socket.emit('msg', {
                    clientType: 'controller',
                    time: performance.now()
                });
            }, 1000)*/

            socket.on('msg', (data) => {
                console.log(data)
            });
        });
    }

    handleGyroscopeEvent (e) {
        let eventObj = {
            beta: e.beta
        };
        console.log(eventObj)
        this.socket.emit('message', eventObj);
    }

    handleClickEvent(top) { // top: user clicks either in upper part of the screen or in the lower part
        let eventObj = {
            direction: top
        };
        eventObj.direction = '' + top;
        this.socket.emit('message', eventObj);
    }

}