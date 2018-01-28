const uid = require('uid');
const randColor = require('randomcolor');

module.exports = class{
    constructor(side){
        this.uid = uid();
        this.color = randColor();
        this.side = side; // 0: left, 1: right
        this.name = 'Player_'+this.uid;
    }
    setSide(value){
        if(value == 0 || value == 1){
            this.side = value;
        }else{
            // random side
            this.side = (Math.random() < 0.5)?0:1;
        }
    }



}