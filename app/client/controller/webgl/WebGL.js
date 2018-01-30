'use strict';

import * as THREE from 'three'; //import THREE from 'three' doesn't work.

class WebGL {

    constructor(w, h) {
        this.renderer = null;
        this.camera = null;
        this.scene = null;
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
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
        this.camera.position.set(0, 0, 15);
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
    	console.log("sdf")
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
		this.cube = new THREE.Mesh(geometry, material);
		this.scene.add(this.cube);

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