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

        let disconnectEvents = connections.flatMap((x) => {
            return Rx.Observable.create(x.disconnectObserver);
        });

        let viewerEvents = viewerConnections.flatMap((x) => {
            return Rx.Observable.create(x.msgObserver);
        });
        
        let controllerEvents = controllerConnections.flatMap((x) => {
            return Rx.Observable.create(x.msgObserver);
        });
        
        
        viewerConnections.subscribe((data) => {
            console.log('viewerConnections', data);
            data.send({hello: 'rx'});
        })

        controllerConnections.subscribe((data) => {
            console.log('controllerConnections', data);
            data.send({hello: 'rx'});
        })
        
        disconnectEvents.subscribe((data) => {
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
            
        })
    }
}