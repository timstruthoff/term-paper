import CONFIG from './../../config';

import * as THREE from 'three'; //import THREE from 'three' doesn't work.

import Cube from './objects/Cube';
import AmbientLight from './objects/AmbientLight';
import SpotLight from './objects/SpotLight';


class WebGL {

    constructor(w, h) {
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
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 7, 0);
        this.camera.lookAt(new THREE.Vector3( 0, 0, 0))

        window.scene = this.scene;
        window.THREE = THREE;

    }

    /*
	Creating the renderer.
    */
    createRenderer(w, h) {
        console.log(w, h)
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

    }

    /*
	Adding starting objects to the scene.
    */
    addObjects() {

        this.objects = {};
        this.objects.ambient = new AmbientLight();
        this.scene.add(this.objects.ambient.obj);

        this.objects.spotLight = new SpotLight();
        this.scene.add(this.objects.spotLight.obj);

        if(CONFIG.DISPLAY_HELPERS) {
            this.objects.lightHelper = new THREE.SpotLightHelper(this.objects.spotLight.obj);
            this.scene.add(this.objects.lightHelper);

            this.scene.add(new THREE.AxesHelper(10));
        }
        
        this.objects.cube = new Cube();
        this.scene.add(this.objects.cube.obj);

    }

    changePlayerColor(color) {
        this.objects.cube.setColor(color);
    }

    get cubeRotationX () {
        return this.objects.cube.obj.rotation.x;
    }

    set cubeRotationX (x) {
        this.objects.cube.obj.rotation.x = x;
    }

    get cubeRotationY () {
        return this.objects.cube.obj.rotation.y;
    }

    set cubeRotationY (y) {
        this.objects.cube.obj.rotation.y = y;
    }

    get cubeRotationZ () {
        return this.objects.cube.obj.rotation.z;
    }

    set cubeRotationZ (z) {
        this.objects.cube.obj.rotation.z = z;
    }

    /*
    Handling a browser window resize and changing the render size accordingly.
    */
    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.update();

    }

    /*
    Updating everything on requestAnimationFrame
    */
    update(el) {
        if(CONFIG.DISPLAY_HELPERS) {
            this.objects.lightHelper.update();
        }
        this.renderer.render(this.scene, this.camera);
    }



}

export default WebGL;