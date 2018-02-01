const Rx = require('rxjs/Rx');

module.exports = class {

    constructor (websocket) {
        let connections = Rx.Observable
            .create(websocket.connectObserver);

        let viewerConnections = connections.filter((connectionData) => {
            return connectionData.clientType == "viewer";
        });

        let controllerConnections = connections.filter((connectionData) => {
            return connectionData.clientType == "controller";
        });

        let controllerDisconnect = controllerConnections.flatMap((x) => {
            return Rx.Observable.create(x.disconnectObserver);
        });

        let viewerEvents = viewerConnections.flatMap((x) => {
            return Rx.Observable.create(x.msgObserver);
        });
        
        let controllerEvents = controllerConnections.flatMap((x) => {
            return Rx.Observable.create(x.msgObserver);
        });

        let numberOfConnects = controllerConnections.startWith(0).scan((lastValue) => {return lastValue + 1}, 0);
        let numberOfDisconnects = controllerDisconnect.startWith(0).scan((lastValue) => {return lastValue + 1}, 0);
        let numberOfControllers = Rx.Observable.combineLatest(numberOfConnects, numberOfDisconnects, (c, d) => c - d);

        numberOfControllers.subscribe((data) => {
            console.log('numberOfControllers', data);
        })
        
        
        viewerConnections.subscribe((data) => {
            console.log('viewerConnections', data);
            data.send({hello: 'rx'});
        })

        controllerConnections.subscribe((data) => {
            console.log('controllerConnections', data);
            data.send({hello: 'rx'});
        })
        
        controllerDisconnect.subscribe((data) => {
            console.log('disconnect', data);
        })
        
        viewerEvents.subscribe((data) => {
            console.log('viewer', data);
        })
        
        controllerEvents.subscribe((data) => {
            console.log('controller', data);
        })

        viewerConnections.subscribe((connection) => {
            console.log('new Viewer');
            controllerEvents.subscribe((controllerEventData) => {
                console.log('sending')
                connection.send(controllerEventData);
            });
            
            numberOfControllers.subscribe((number) => {
                console.log('sending')
                connection.send({
                    number,
                    type: 'numberControllers'
                });
            });
            
        })
    }
}