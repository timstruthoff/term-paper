import domready from 'domready';
import App from './core/App.js';

class Main {
    
    constructor() {
        this.app = new App();
    }
}

domready(() => {

    new Main();

});
