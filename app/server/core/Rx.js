const Rx = require('rxjs/Rx');

module.exports = class {

    constructor(websocket) {
        this.numberOfControllers = 2;

        let oConnections = Rx.Observable
            .create(websocket.connectObserver);

        let oViewerConnections = oConnections.filter((connectionData) => {
            return connectionData.clientType == "viewer";
        });

        let oControllerConnections = oConnections.filter((connectionData) => {
            return connectionData.clientType == "controller";
        });

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
            this.numberOfControllers = number;
        })


        // routing controller events to viewer
        oViewerConnections.subscribe((connection) => {
            console.log('new Viewer');
            controllerEvents.subscribe((controllerEventData) => {
                console.log('sending')
                connection.send(controllerEventData);
            });

            oNumberOfControllers.subscribe((number) => {
                console.log('sending')
                connection.send({
                    number,
                    type: 'numberControllers'
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

        oControllerConnections
            .subscribe((data) => {
                console.log('<2')
                data.send({
                    eventType: 'init',
                    msg: 'waitingForPlayers'
                });
                
                oEnoughPlayers
                    .filter(value => {return value})
                    .subscribe(() => {
                        console.log('player ready', data);
                        data.send({
                            eventType: 'init',
                            msg: 'ready'
                        });
                    });

                oEnoughPlayers
                    .filter(value => {return !value})
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