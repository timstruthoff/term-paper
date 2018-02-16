import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

import Websocket from './../components/Websocket';
import GameView from './GameView';
import PlayerStore from './../components/PlayerStore';


export default class App {

    constructor() {
        this.socket = new Websocket();
        this.playerStore = new PlayerStore();
        
        let stream = Observable
            .create(this.socket.observerFunction)
            .flatMap((x) => {
                return Observable.create(x.stream);
            });

        
        stream.subscribe((data) => {
            console.log(data);
        });

        let oNewPlayers = stream.filter(event => {
            return event.type == 'newPlayer';
        });

        oNewPlayers.subscribe( event => {
            console.log('newPlayer', event);
            this.playerStore.addPlayer(event.player);
            console.log(this.playerStore);
        } );

        let gameView = new GameView();



    }

}