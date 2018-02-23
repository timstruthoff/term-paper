const Player = require('./Player');

module.exports = class{
    constructor(){
        this.store = {};
    }

    createPlayer(side){
        let player = new Player(side);
        let id = player.uid;
        this.store[id] = player;
        return player;
    }

    removePlayer(uid){
        delete this.store[uid];
    }

    getPlayer(uid){
        return this.store[uid];
    }


}