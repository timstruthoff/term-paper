const Rx = require('rxjs/Rx');
const PlayerStore = require('./../components/PlayerStore');
const EventEmitter = require('events');

module.exports = class {

    constructor(websocket) {
        this.numberOfControllers = 2;

        let playerStore = new PlayerStore();

        let viewerEventBus = new EventEmitter();

        let oConnections = Rx.Observable
            .create(websocket.connectObserver);

        let oViewerConnections = oConnections.filter((connectionData) => {
            return connectionData.clientType == "viewer";
        });

        let oControllerConnections = oConnections.filter((connectionData) => {
            return connectionData.clientType == "controller";
        });

        let oControllerEvents = oControllerConnections.flatMap((x) => {
            return Rx.Observable.create(x.msgObserver);
        });

        oControllerEvents.subscribe( data => {
            viewerEventBus.emit('event', data);
        } );

        let oControllerDisconnect = oControllerConnections.flatMap((x) => {
            return Rx.Observable.create(x.disconnectObserver);
        });


        let oNumberOfConnects = oControllerConnections.startWith(0).scan((lastValue) => {
            return lastValue + 1
        }, 0);
        let oNumberOfDisconnects = oControllerDisconnect.startWith(0).scan((lastValue) => {
            return lastValue + 1
        }, 0);
        let oNumberOfControllers = Rx.Observable.combineLatest(oNumberOfConnects, oNumberOfDisconnects, (c, d) => c - d);

        oNumberOfControllers.subscribe((number) => {
            console.log('oNumber_subscribe: ', number);
            this.numberOfControllers = number;
            viewerEventBus.emit('numberControllers', number);
        })


        // routing controller events to viewer
        oViewerConnections.subscribe((connection) => {
            console.log('new Viewer');

            for (let uid in playerStore.store) {
                connection.send({
                    type: 'newPlayer',
                    player: playerStore.store[uid]
                });
            }

            viewerEventBus.on('event', viewerEventData => {
                connection.send(viewerEventData);
            });
            viewerEventBus.on('numberControllers', number => {
                console.log('sending');
                connection.send({
                    type: 'numberControllers',
                    number
                }); 
            });
            viewerEventBus.on('newPlayer', player => {
                connection.send({
                    type: 'newPlayer',
                    player
                });
            });
        })


        // controller init flow
        let oEnoughPlayers = new Rx.BehaviorSubject(false);

        oNumberOfControllers
            .subscribe(number => {
                let enoughPlayers = number > 1;
                let currentValue 
                oEnoughPlayers.first().subscribe(value => {
                    currentValue = value;
                    if (currentValue != enoughPlayers) {
                        oEnoughPlayers.next(enoughPlayers);
                    }
                })
                
            });

        oEnoughPlayers.subscribe(value => {
            console.log('oEnoughPlayers: ' + value)
        })

        oControllerEvents.subscribe(value => {
            //console.log('oControllerEvent: ', value);
        });

        oControllerConnections
            .subscribe((data) => {
                console.log('<2')
                let currentNumberOfControllers = this.numberOfControllers;
                data.send({
                    eventType: 'init',
                    msg: 'waitingForPlayers'
                });
                
                oEnoughPlayers
                    .filter(value => {return value})
                    .first()
                    .subscribe(() => {
                        console.log('player ready', data);
                        let player = playerStore.createPlayer(currentNumberOfControllers % 2);
                        console.log('new controller created; total number: ', this.numberOfControllers);

                        viewerEventBus.emit('newPlayer', player);

                        data.send({
                            eventType: 'init',
                            msg: 'ready',
                            player
                        });
                    });

                oEnoughPlayers
                    .filter(value => {return !value})
                    .first()
                    .subscribe(() => {
                        console.log('player wait', data);
                        data.send({
                            eventType: 'init',
                            msg: 'waitingForPlayers'
                        });
                    });
                
            })
    }
}