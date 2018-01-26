import domready from 'domready';
import App from './core/App.js';

class Main {
    
    constructor() {
        this.app = new App();
        this.addEventListeners();
        this.init();

    }

    addEventListeners() {
        document.getElementById('button_top').addEventListener("click", (event) => { 
            this.app.handleTopClick(event);
        });
        document.getElementById('button_bottom').addEventListener("click", (event) => { 
            this.app.handleBottomClick(event);
        });
    }

    init() {

    }
}

domready(() => {

    new Main();

});
