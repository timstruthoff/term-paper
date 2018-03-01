import CONFIG from './../../config';

export default class {

    constructor(message) {
        this.containerEl = document.createElement('div');

        this.containerEl.style.position = 'fixed';
        this.containerEl.style.top = '0';
        this.containerEl.style.width = '100%';
        this.containerEl.style.height = '100%';
        this.containerEl.style.backgroundColor = '#1A1C21';

        this.pEl = document.createElement('p');
        this.pEl.style.color = '#F9FAFC';
        this.pEl.style.width = '100%';
        this.pEl.style.height = '100%';
        this.pEl.style.lineHeight = '20vh';
        this.pEl.style.fontSize = '13vh';
        this.pEl.style.fontFamily = '"Helvetica Neue",Helvetica,Arial,sans-serif';
        this.pEl.style.textAlign = 'center';
        this.pEl.innerHTML = message;

        this.containerEl.appendChild(this.pEl);
        document.body.appendChild(this.containerEl);
    }

    destroy() {
        document.body.removeChild(this.containerEl);
        console.log('in_dest')
    }
}