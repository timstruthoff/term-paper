import Websocket from './../components/Websocket';
import Rx from 'rxjs/Rx';

export default class App {

    constructor() {
        this.socket = new Websocket();
        this.socket.onConnect = () => {console.log("testApp");}

        let obs = Rx.Observable.of(1,2,3);
        obs.subscribe((x)=>{console.log(x);});


    }

}