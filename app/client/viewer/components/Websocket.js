import io from 'socket.io-client';
import { setInterval } from 'timers';

export default class Websocket {

    constructor() {
        const socket = io('http://localhost:3000');

        this.onConnect = () => {
            console.log("test");
        }

        socket.on('connect', ((localOnconnect)=>{
            return ()=>{
                localOnconnect(socket);
            }} )(this.onConnect) );
    }
}