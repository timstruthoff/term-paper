/*import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/window';
import 'rxjs/add/operator/average';*/
import Rx from 'rxjs/Rx';
import raf from 'raf';

import Websocket from './../components/Websocket';
import GameView from './GameView';
import PlayerStore from './../components/PlayerStore';
import PerSecond from './../util/PerSecond';


export default class App {

    constructor() {
        this.socket = new Websocket();
        this.playerStore = new PlayerStore();
        this.gameView = new GameView();

        let eventsPerSecond = new PerSecond('Events per second: ');

        eventsPerSecond.listener = (number) => {
            this.gameView.updateEventsPerSecond(number);
        }
        
        let stream = Rx.Observable
            .create(this.socket.observerFunction)
            .flatMap((x) => {
                return Rx.Observable.create(x.stream);
            });

        
        stream.subscribe((data) => {
            //console.log(data);
            eventsPerSecond.emit();
        });

        let oEvents = stream
            .filter( event => {
                return event.type == 'event';
            })
            .map( event => {
                let player = this.playerStore.getPlayer(event.uid);
                event.player = player;
                return event;
            });
            oEvents.subscribe( event => {
                //console.log('general event: ', event);
                if(event.player != undefined){
                    this.gameView.movePlayerBox(event.player.uid, event.beta); 
                }
            });
        
        let oRAF = Rx.Observable // RAF = Request Animation Frame
            .create(observer => {
                let update = () => {
                    observer.next();
                    raf(update);
                };
                update();
            });

        let oLeftSideEvents = oEvents
            .filter( event => {
                return  ( event.player != undefined && event.player.side == 0);
            })
            .map( event => {
                return event.beta;
            })
            .window(oRAF)
            .flatMap( event => { // return average
                return event
                .reduce((prev, cur) => ({
                    sum: prev.sum + cur,
                    count: prev.count + 1
                }), { sum: 0, count: 0 })
                .filter( o => {
                    return (typeof o.count == 'number' && o.count > 0);
                })
                .map(o => o.sum / o.count);
            });
        
        let oRightSideEvents = oEvents
            .filter( event => {
                return  ( event.player != undefined && event.player.side == 1);
            })
            .map( event => {
                return event.beta;
            })
            .window(oRAF)
            .flatMap( event => { // return average
                return event
                .reduce((prev, cur) => ({
                    sum: prev.sum + cur,
                    count: prev.count + 1
                }), { sum: 0, count: 0 })
                .filter( o => {
                    return (typeof o.count == 'number' && o.count > 0);
                })
                .map(o => o.sum / o.count);
            });
        oRightSideEvents.subscribe( event => {
            //console.log('right event: ', event);
            this.gameView.movePaddle(1, event);
        });
        oLeftSideEvents.subscribe( event => {
            //console.log('left event: ', event);
            this.gameView.movePaddle(0, event);
        });

        let oNewPlayers = stream.filter(event => {
            return event.type == 'newPlayer';
        });

        oNewPlayers.subscribe( event => {
            console.log('newPlayer', event);
            this.playerStore.addPlayer(event.player);
            //console.log(this.playerStore);
            this.gameView.addPlayerBox(event.player);
            if(event.player.side == 0){
                this.gameView.webGL.updatePlayerboxes(this.playerStore.sortedL);
            }else{
                this.gameView.webGL.updatePlayerboxes(this.playerStore.sortedR);
            }
        } );
        
        let oRemovePlayers = stream.filter(event => {
            return event.type == 'removePlayer';
        });

        oRemovePlayers.subscribe( event => {
            console.log('removePlayer', event);
            this.playerStore.removePlayer(event.player.uid);
            this.gameView.webGL.removePlayerbox(event.player.uid);
            if(event.player.side == 0){
                this.gameView.webGL.updatePlayerboxes(this.playerStore.sortedL);
            }else{
                this.gameView.webGL.updatePlayerboxes(this.playerStore.sortedR);
            }
        } );



    }

}