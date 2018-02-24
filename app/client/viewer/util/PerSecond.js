export default class{
    constructor(msg){
        this.count = 0;
        this.listener = count => {
            console.log(msg, count);
        };
        this.start();
    }
    start(){
        this.interval = setInterval( () =>{
            this.listener(this.count);
            this.count = 0;
        }, 1000);
        
    }
    stop(){
        clearInterval(this.interval);
    }
    emit(){
        this.count++;
    }

}