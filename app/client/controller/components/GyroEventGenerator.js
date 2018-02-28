import CONFIG from './../../config'

export default class {

    constructor(args) {
        window.addEventListener('deviceorientation', (e) => {
            this.onChange({
                alphaOrig: this.normalize(e.alpha),
                betaOrig: this.normalize(e.beta),
                beta: this.sensitivity(this.normalize(e.beta)),
                gammaOrig: this.normalize(e.gamma)
            });
        }, false);  
    }

    sensitivity(value) {
        let sensitivity = 1 / CONFIG.CONTROLLER_SENSITIVITY;
        let lowerBorder = (1 - sensitivity) / 2;
        let upperBorder = 1 - ((1 - sensitivity) / 2);
        return (Math.min(upperBorder, Math.max(lowerBorder, value)) - lowerBorder) * (1 / sensitivity); // limits number to 0 - 1
    }

    normalize(value) {
        return (value / 360) + 0.5;
    }

    onChange (data) {
        console.log(data);
    }
}