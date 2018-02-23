export default class{
    constructor(){
        this.store = {};
        this.sortedL = [];
        this.sortedR = [];
    }

    addPlayer(player){
        this.store[player.uid] = player;
        if(player.side == 0){
            this.sortedL.push(this.store[player.uid]);
        }else{
            this.sortedR.push(this.store[player.uid]);
        }
    }

    removePlayer(uid){
        if(this.store[uid] == undefined){ return; }
        let arr = null;
        let idx = null;
        if(this.store[uid].side == 0){
            arr = this.sortedL;
        }else{
            arr = this.sortedR;
        }
        for(let i = 0; i < arr.length; i++){
            if(arr[i].uid == uid){idx = i;}
        }
        if( idx != null ){
            arr.splice(idx, 1);
            delete this.store[uid];
        }
    }

    getPlayer(uid){
        return this.store[uid];
    }


}