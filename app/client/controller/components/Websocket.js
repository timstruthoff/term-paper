import io from 'socket.io-client';
import { setInterval } from 'timers';

export default class Websocket {

    constructor() {
        const socket = io('http://localhost:3000');

        socket.on('connect', function () {
            console.log('connected')

            socket.emit('message', {
                hello: 'client'
            });

            socket.on('message', function (data) {
                console.log(data)
            });
        });
    }
}