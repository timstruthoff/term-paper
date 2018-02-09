export default class {

    constructor(args) {
        window.addEventListener('deviceorientation', (e) => {
            this.onChange({
                beta: e.beta
            });
        }, false);
        window.ondeviceorientation = (e) => {
            this.onChange({
                beta: e.beta
            });
        }
    }

    onChange (data) {
        console.log(data);
    }
}