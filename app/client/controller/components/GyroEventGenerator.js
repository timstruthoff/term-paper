export default class {

    constructor(args) {
        window.addEventListener('deviceorientation', (e) => {
            this.onChange({
                beta: this.normalize(e.beta)
            });
        }, false);
        window.ondeviceorientation = (e) => {
            this.onChange({
                beta: this.normalize(e.beta)
            });
        }
    }

    normalize(value) {
        return (value / 360) + 0.5
    }

    onChange (data) {
        console.log(data);
    }
}