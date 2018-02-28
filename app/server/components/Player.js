const uid = require('uid'); 

module.exports = class{
    constructor(side){
        this.uid = uid();
        this.side = side; // 0: left, 1: right
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