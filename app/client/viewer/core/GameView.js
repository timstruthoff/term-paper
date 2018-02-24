import CONFIG from './../../config';

import dat  from 'dat-gui';
import raf from 'raf';
import Stats  from 'stats.js';

import * as THREE from 'three';

import WebGL from '../webgl/WebGL';

export default class GameView {

    constructor(args) {
        this.webGL = null;
        console.log(THREE.REVISION)
        this.gui = null;
        this.clock = new THREE.Clock();
        this.SIZE = {
            w: window.innerWidth,
            w2: window.innerWidth / 2,
            h: window.innerHeight,
            h2: window.innerHeight / 2
        };


        this.bind();

        this.startWebGL();

        this.startStats();
        this.startGUI();

        this.addEventListener();

        this.update();
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
        let localThis = this;
        window.addEventListener('resize', this.onResize);
        window.addEventListener('keyup', this.onKeyUp);

    }

    /*
	Creating the stats display and showing it if in debug mode.
    */
    startStats() {
        this.stats = new Stats();
        this.eventPanel = this.stats.addPanel( new Stats.Panel( 'test', '#ff8', '#221' ) );
        this.stats.showPanel( 2 );

        this.stats.dom.style.display = CONFIG.DEBUG ? 'block' : 'none';
        document.body.appendChild( this.stats.dom );
    }

    updateEventsPerSecond (eps) {
        this.eventPanel.update( eps, 460 );
    }


    /*
	Creating the data control panel.
    */
    startGUI() {
        this.gui = new dat.GUI()
        this.gui.domElement.style.display = CONFIG.DEBUG ? 'block' : 'none';

        let cameraFolder = this.gui.addFolder('Camera');
        //cameraFolder.add(this.webGL.camera.position, 'x', -10, 10);
        //cameraFolder.add(this.webGL.camera.position, 'y', -10, 10);
        //cameraFolder.add(this.webGL.camera.position, 'z', 50, 150);

        let composerFolder = this.gui.addFolder('PostProcessing');
        //composerFolder.add(this.webGL, 'useComposer');

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

        //let el = this.clock.getElapsedTime() * .05;
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

    movePaddle(side, position){
        this.webGL.movePaddle(side, position);
    }
    addPlayerBox(player){
        this.webGL.addPlayerbox(player);
    }
    movePlayerBox(id, position){
        this.webGL.movePlayerbox(id, position);
    }
}