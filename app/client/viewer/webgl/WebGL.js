import * as THREE from 'three'; //import THREE from 'three' doesn't work.
import OrbitControls from 'three-orbitcontrols';

import Box from './objects/Box';
import Ground from './objects/Ground';
import AmbientLight from './objects/AmbientLight';
import SpotLight from './objects/SpotLight';


class WebGL {

    constructor(w, h) {
        this.createScene();
        this.createRenderer(w, h);
        
        this.addObjects();

        this.onResize();
        this.createControls();

        this.update();
    }

    /*
    Setting up the basic scene.
    */
    createScene() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(65, 8, -10);

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
    Creating the controls.
    */
    createControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 20;
        this.controls.maxDistance = 500;
        this.controls.enablePan = false;
        this.controls.target.copy(this.objects.box.obj.position);

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

        this.objects.lightHelper = new THREE.SpotLightHelper(this.objects.spotLight.obj);
        this.scene.add(this.objects.lightHelper);

        this.objects.shadowCameraHelper = new THREE.CameraHelper(this.objects.spotLight.obj.shadow.camera);
        this.scene.add(this.objects.shadowCameraHelper);

        this.scene.add(new THREE.AxesHelper(10));

        this.objects.ground = new Ground();
        this.scene.add(this.objects.ground.obj);
        
        this.objects.box = new Box();
        this.scene.add(this.objects.box.obj);

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
        this.objects.lightHelper.update();
        this.objects.shadowCameraHelper.update();
        this.renderer.render(this.scene, this.camera);
    }



}

export default WebGL;