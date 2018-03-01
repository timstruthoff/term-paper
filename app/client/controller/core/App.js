import CONFIG from './../../config';

import Websocket from "./../components/Websocket";
import GyroEventGenerator from "./../components/GyroEventGenerator";
import TouchEventGenerator from "./../components/TouchEventGenerator";
import Overlay from "./../components/Overlay";

import raf from 'raf';
import Stats from 'stats.js';

import * as THREE from 'three';

import WebGL from '../webgl/WebGL';

export default class {

    constructor(args) {
        this.webgl = null;

        console.log(THREE.REVISION)
        this.clock = new THREE.Clock();
        this.DEBUG = true;
        this.SIZE = {
            w: window.innerWidth,
            w2: window.innerWidth / 2,
            h: window.innerHeight,
            h2: window.innerHeight / 2
        };

        this.bind();

        this.websocket = new Websocket();

        this.eventGenerator = new GyroEventGenerator();
        this.eventGenerator.onChange = (data) => {
            console.log(data);
            this.webGL.cubeRotationX = (-data.betaOrig - 0.5) * Math.PI;
            this.webGL.cubeRotationZ = ((-data.gammaOrig - 0.5) * 0.5) * Math.PI;
            this.websocket.handleEvent({
                beta: data.beta
            });
        }

        this.touchEventGenerator = new TouchEventGenerator();
        this.touchEventGenerator.onChange = (data) => {
            console.log(data);
        }

        this.startWebGL();

        this.startStats();

        this.addEventListener();

        this.update();

        this.websocket.on('waitingForPlayers', () => {
            console.log('wait')
            if (this.overlay != undefined) {
                console.log('destroy')
                this.overlay.destroy();
                this.overlay = undefined;
            }
            this.overlay = new Overlay('Waiting<br>for<br>players!');
            
        });

        this.websocket.on('ready', (player) => {
            console.log(this);
            console.log('ready');
            console.log(player);

            this.webGL.changePlayerColor(player.color);
            
            if (this.overlay != undefined) {
                console.log('destroy')
                this.overlay.destroy();
                this.overlay = undefined;
            }
        });

    }


    /*
    Binding the Manager "this" to the functions "this".
    */
    bind() {

        this.update = this.update.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onResize = this.onResize.bind(this);

    }


    /*
    Adding the event listeners for all global events.
    */
    addEventListener() {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('keyup', this.onKeyUp);


    }

    /*
	Creating the stats display and showing itif in debug mode.
    */
    startStats() {
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = 0;
        this.stats.domElement.style.display = this.DEBUG ? 'block' : 'none';
        this.stats.domElement.style.left = 0;
        this.stats.domElement.style.zIndex = 50;
        document.body.appendChild(this.stats.domElement);
    }

    /*
	Initializing the WebGL module.
    */
    startWebGL() {
        console.log(window.innerHeight)
        this.webGL = new WebGL(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.webGL.renderer.domElement);

    }


    /*
	Updating everything on request animation frame.
    */
    
    update() {

        this.stats.begin();

        let el = this.clock.getElapsedTime() * .05;
        let d = this.clock.getDelta();

        this.webGL.update(d);

        this.stats.end()



        raf(this.update);

    }


    /*
    Handling all global events
    */
    onKeyUp(e) {

        let key = e.which || e.keyCode;
        console.log(key);

    }

    onResize() {

        this.SIZE = {
            w: window.innerWidth,
            w2: window.innerWidth / 2,
            h: window.innerHeight,
            h2: window.innerHeight / 2
        };

        this.webGL.onResize();

    }

}