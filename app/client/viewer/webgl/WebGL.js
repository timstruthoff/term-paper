import * as THREE from 'three'; //import THREE from 'three' doesn't work.
import OrbitControls from 'three-orbitcontrols';

import Paddle from './objects/Paddle';
import PlayerBox from './objects/PlayerBox';
import Ground from './objects/Ground';
import AmbientLight from './objects/AmbientLight';
import SpotLight from './objects/SpotLight';


class WebGL {

    constructor(w, h) {
        this.numberOfPlayersL = 0;
        this.numberOfPlayersR = 0;

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
        this.camera.position.set(0, 20, -60);

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
        this.controls.target.set(0,0,0);
    }

    /*
	Adding starting objects to the scene.
    */
    addObjects() {

        this.objects = {};
        this.objects.playerBoxes = {};
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
        
        this.objects.paddleL = new Paddle(0);
        this.scene.add(this.objects.paddleL.obj);
        
        this.objects.paddleR = new Paddle(1);
        this.scene.add(this.objects.paddleR.obj);

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

    movePaddle(side, position){
        if( side == 0 ){
            this.objects.paddleL.move(position);
        }else if (side == 1){
            this.objects.paddleR.move(position);
        }
    }

    addPlayerbox(player){
        let numberY = 0;
        if(player.side == 0){
            numberY = this.numberOfPlayersL++;
        }else if(player.side == 1){
            numberY = this.numberOfPlayersR++;
        }
        this.objects.playerBoxes[player.uid] = new PlayerBox(player.side, numberY);
        this.scene.add(this.objects.playerBoxes[player.uid].obj);
    }

    movePlayerbox(id, position){
        this.objects.playerBoxes[id].move(position);
    }



}

export default WebGL;