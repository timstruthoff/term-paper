export default class {

    constructor(message) {
        this.containerEl = document.createElement('div');

        this.containerEl.style.position = 'fixed';
        this.containerEl.style.width = '100%';
        this.containerEl.style.height = '100%';
        this.containerEl.style.backgroundColor = '#fff';
        this.containerEl.style.position = 'fixed';


        this.pEl = document.createElement('p');
        this.pEl.innerHTML = message;

        this.containerEl.appendChild(this.pEl);
        document.body.appendChild(this.containerEl);
    }

    destroy() {
        document.body.removeChild(this.containerEl);
    }
}