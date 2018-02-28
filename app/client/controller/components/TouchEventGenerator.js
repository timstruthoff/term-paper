import CONFIG from './../../config'

export default class {

    constructor(args) {
        let eventListener = (e) => {
            this.onChange({
                beta: this.normalizeY(e.clientY)
            });
        };

        window.addEventListener('mousedown', () => {

            window.addEventListener('mousemove', eventListener);
        });
        window.addEventListener('mouseup', () => {

            window.removeEventListener('mousemove', eventListener);
        });

        window.addEventListener('touchmove', eventListener);
    }

    normalizeX(value) {

        let sensitivity = 1 / CONFIG.CONTROLLER_SENSITIVITY;
        let lowerBorder = (1 - sensitivity) / 2;
        let upperBorder = 1 - ((1 - sensitivity) / 2);
        return (Math.min(upperBorder, Math.max(lowerBorder, value / window.innerWidth)) - lowerBorder) * (1 / sensitivity); // limits number to 0 - 1
    }

    normalizeY(value) {
        let sensitivity = 1 / CONFIG.CONTROLLER_SENSITIVITY;
        let lowerBorder = (1 - sensitivity) / 2;
        let upperBorder = 1 - ((1 - sensitivity) / 2);
        return (Math.min(upperBorder, Math.max(lowerBorder, value / window.innerHeight)) - lowerBorder) * (1 / sensitivity); // limits number to 0 - 1
    }

    onChange (data) {
        console.log(data);
    }
}