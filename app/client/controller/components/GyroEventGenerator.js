import CONFIG from './../../config'

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
        let normalized = (value / 360) + 0.5;
        
        let sensitivity = 1 / CONFIG.CONTROLLER_SENSITIVITY;
        let lowerBorder = (1 - sensitivity) / 2;
        let upperBorder = 1 - ((1 - sensitivity) / 2);
        return (Math.min(upperBorder, Math.max(lowerBorder, normalized)) - lowerBorder) * (1 / sensitivity); // limits number to 0 - 1
    }

    onChange (data) {
        console.log(data);
    }
}