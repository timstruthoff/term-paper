import domready from 'domready';
import App from './core/App.js';
import Websocket from './components/Websocket';

class Main {

    constructor() {

        this.addEventListeners();
        this.init();

    }

    addEventListeners() {

    }

    init() {
        new App();
        new Websocket();

    }
}

domready(() => {

    new Main();

});
