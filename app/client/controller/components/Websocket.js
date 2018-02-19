import io from 'socket.io-client';
import EventEmitter from 'events';

export default class Websocket extends EventEmitter {

    constructor() {
        super();

        let socket = io();
        this.socket = socket;
        this.uid = null;

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
                            this.uid = data.player.uid;
                            this.emit('ready', data.player);
                            break;
                        case 'waitingForPlayers': 
                            this.emit('waitingForPlayers');
                            break;
                    }
                    
                }
            });
        });
    }
    

    handleEvent (e) {
        let eventObj = {
            type: 'event',
            beta: e.beta,
            uid: this.uid
        };
        
        this.socket.emit('msg', eventObj);
    }



}