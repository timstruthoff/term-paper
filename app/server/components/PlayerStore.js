const Player = require('./Player');

module.exports = class{
    constructor(){
        this.store = {};
    }

    createPlayer(side){
        let player = new Player(side);
        let id = player.uid;
        this.store[id] = player;
        return id;
    }

    getPlayer(id){
        return this.store[id];
    }


}