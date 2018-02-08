'use strict';

import * as THREE from 'three'; //import THREE from 'three' doesn't work.
import TestCube from './objects/TestCube';
import Plane from './objects/Plane';
import AmbientLight from './objects/AmbientLight';
import SpotLight from './objects/SpotLight';

class WebGL {

    constructor(w, h) {
        this.renderer = null;
        this.camera = null;
        this.scene = null;
        window.THREE = THREE;

        this.cube = null;

        this.createScene();
        this.createRenderer(w, h);

        this.addObjects();

        this.onResize();
        this.update();
    }


    /*
	Setting up the basic scene.
    */
    createScene() {

        this.scene = new THREE.Scene();
        window.scene = this.scene;

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
        this.camera.position.set(0, 20, 15);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    }


    /*
	Creating the renderer.
    */
    createRenderer(w, h) {
    	console.log(w, h)
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(w, h);
        this.renderer.setClearColor(0x111111);

    }


    /*
	Adding starting objects to the scene.
    */
    addObjects() {
        this.scene.add(new TestCube().mesh);
        this.scene.add(new Plane().mesh);
        this.scene.add(new AmbientLight().light);

    }


	/*
	Handling a browser window resize and changing the render size accordingly.
    */
    onResize() {

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

    }

    get cubeRotationX () {
        return this.cube.rotation.x;
    }

    set cubeRotationX (x) {
        this.cube.rotation.x = x;
    }

    get cubeRotationY () {
        return this.cube.rotation.y;
    }

    set cubeRotationY (y) {
        this.cube.rotation.y = y;
    }


    /*
	Upadting everything on requestAnimationFrame
    */
    update(el) {
    	// this.cubeRotationX += 0.01;
    	// this.cubeRotationY += 0.01;
        this.renderer.render(this.scene, this.camera);

    }

}

export default WebGL;