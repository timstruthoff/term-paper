import Websocket from './../components/Websocket';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';


export default class App {

    constructor() {
        this.socket = new Websocket();
        
        let stream = Observable
            .create(this.socket.observerFunction)
            .flatMap((x) => {
                return Observable.create(x.stream);
            });

        
        stream.subscribe((data) => {
            console.log(data);
        })



    }

}