export default class {

    constructor(pSpeed) {

        this.speed = 0.005;
        this.direction = true;
        this.value = 0;
        this.randomness = 0;
        this.bind();
        this.start();
    }

    bind() {
        this.directionLoop = this.directionLoop.bind(this);
        this.valueLoop = this.valueLoop.bind(this);
    }

    directionLoop() {
        this.direction = !this.direction;

        setTimeout(this.directionLoop, Math.random() * (10 / this.speed))
    }

    valueLoop() {
        if(this.direction) {
            this.value += Math.random() * 0.1;
        } else {
            this.value -= Math.random() * 0.1;
        }

        if (this.value >= 1) {
            this.value = 1;
            this.direction = !this.direction;
        }

        if (this.value <= 0) {
            this.value = 0;
            this.direction = !this.direction;
        } 

        this.onChange({
            beta: this.value
        });

        setTimeout(this.valueLoop, Math.random() * (1 / this.speed))
    }

    start() {
        this.directionLoop();
        this.valueLoop();
    }

    onChange (data) {
        console.log(data);
    }
}