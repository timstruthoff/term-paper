export default class{
    constructor(){
        this.store = {};
    }

    addPlayer(player){
        this.store[player.id] = player;
    }

    getPlayer(id){
        return this.store[id];
    }


}