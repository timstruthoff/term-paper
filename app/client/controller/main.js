import domready from 'domready';
import App from './core/App'

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
