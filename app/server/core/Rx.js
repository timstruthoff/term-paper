const Rx = require('rxjs/Rx');

module.exports = class {

    constructor (websocket) {
        let connections = Rx.Observable
            .create(websocket.connectObserver);

        
        let viewerEvents = connections.flatMap((x) => {
            return Rx.Observable.create(x.msgObserver);
        }).filter((data) => {
            return data.clientType == "viewer";
        });
        
        let controllerEvents = connections.flatMap((x) => {
            return Rx.Observable.create(x.msgObserver);
        }).filter((data) => {
            return data.clientType == "controller";
        });
        
        let disconnectEvents = connections.flatMap((x) => {
            return Rx.Observable.create(x.disconnectObserver);
        });
        
        connections.subscribe((data) => {
            console.log('connection', data);
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

        connections.subscribe((connection) => {
            viewerEvents.subscribe((viewerEventData) => {
                connection.send(viewerEventData);
            })
            
        })
    }
}