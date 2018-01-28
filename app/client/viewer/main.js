import domready from 'domready';
import App from './core/App.js';

class Main {

    constructor() {

        this.addEventListeners();
        this.init();

    }

    addEventListeners() {

    }

    init() {
        new App();
        

    }
}

domready(() => {

    new Main();

});
