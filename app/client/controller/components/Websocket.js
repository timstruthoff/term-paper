import io from 'socket.io-client';
import { setInterval } from 'timers';

export default class Websocket {

    constructor() {
        this.socket = io('http://localhost:3000');

        this.socket.on('connect', ((localSocket) => {
            return () => {
                console.log('connected')

                localSocket.emit('message', {
                    hello: 'client'
                });

                localSocket.on('message', (data) => {
                    console.log(data)
                });
            };
        })(this.socket)
        );
    }

    handleClickEvent(top){ // top: user clicks either in upper part of the screen or in the lower part
        let eventObj = {direction : top};
        eventObj.direction = '' + top;
        this.socket.emit('event', eventObj);
    }

}