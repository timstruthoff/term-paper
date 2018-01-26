import Websocket from "./../components/Websocket.js";

export default class App {

    constructor() {
        this.websocket = new Websocket();
    }

    handleTopClick(event){
        this.websocket.handleClickEvent(true);
    }
    handleBottomClick(event){
        this.websocket.handleClickEvent(false);
    }

}