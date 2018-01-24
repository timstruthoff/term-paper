import io from 'socket.io-client';

export default class Websocket {

    constructor () {
        const socket = io('http://localhost');
    }
}