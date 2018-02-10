import io from 'socket.io-client';
import EventEmitter from 'events';

export default class Websocket extends EventEmitter {

    constructor() {
        super();

        let socket = io('http://localhost:3000');
        this.socket = socket;

        socket.on('connect', () => {
            console.log('connected')

            this.emit('connected');

            socket.emit('msg', {
                clientType: 'controller',
                eventType: 'init'
            });

            socket.on('msg', (data) => {
                if (data.eventType == 'init') {
                    switch (data.msg) {
                        case 'ready':
                            this.emit('ready');
                            break;
                        case 'waitingForPlayers': 
                            this.emit('waitingForPlayers');
                            break;
                    }
                    
                }
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