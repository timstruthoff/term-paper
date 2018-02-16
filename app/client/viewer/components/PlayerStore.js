export default class{
    constructor(){
        this.store = {};
    }

    addPlayer(player){
        this.store[player.uid] = player;
    }

    getPlayer(uid){
        return this.store[uid];
    }


}