import * as THREE from 'three'; //import THREE from 'three' doesn't work.
import OrbitControls from 'three-orbitcontrols';

import Paddle from './objects/Paddle';
import PlayerBox from './objects/PlayerBox';
import Ball from './objects/Ball';
import Counter from './objects/Counter';
import Ground from './objects/Ground';
import AmbientLight from './objects/AmbientLight';
import SpotLight from './objects/SpotLight';
import { BoundCallbackObservable } from 'rxjs/observable/BoundCallbackObservable';


class WebGL {

    constructor(w, h) {

        this.createScene();
        this.createRenderer(w, h);
        
        this.addObjects();

        this.onResize();
        this.createControls();

        this.update();

        /*let helpers = this.objects.ball.touches([this.objects.paddleL.obj, this.objects.paddleR.obj]);
        for (let helper of helpers){
            this.scene.add(helper.arrow);
            this.scene.add(helper.point);
        }*/
        /*
        if( this.objects.ball.touches([this.objects.paddleL.obj, this.objects.paddleR.obj]) ){
            console.log('collision at: ', this.objects.ball.obj.position);
            this.objects.ball.speed = 0;
        }*/

        
    }

    /*
    Setting up the basic scene.
    */
    createScene() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 20, 60);

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
        this.controls.minDistance = 1;
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

        this.objects.ball = new Ball();
        this.scene.add(this.objects.ball.obj);

        this.objects.counter = new Counter();
        this.scene.add(this.objects.counter.objColon);
        this.scene.add(this.objects.counter.objLeftNumber);
        this.scene.add(this.objects.counter.objRightNumber);

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
        if(this.objects.ball.obj.position.x < this.objects.paddleL.obj.position.x ){
            this.objects.ball.reset();
            this.objects.counter.increaseRight();
        }else if( this.objects.ball.obj.position.x > this.objects.paddleR.obj.position.x ){
            this.objects.ball.reset();
            this.objects.counter.increaseLeft();
        }

        if( this.objects.ball.obj.position.z < this.objects.paddleL.lengthOfTravelZ / (-2) ){
            this.objects.ball.direction *= -1;            
        }else if( this.objects.ball.obj.position.z > this.objects.paddleL.lengthOfTravelZ / 2 ){
            this.objects.ball.direction *= -1;            
        }
        let paddle = null;
        switch( this.objects.ball.touches([this.objects.paddleL.obj, this.objects.paddleR.obj]) ){
            case this.objects.paddleL.obj.uuid:
                paddle = this.objects.paddleL; 
                break;
            case this.objects.paddleR.obj.uuid:
                paddle = this.objects.paddleR;
                break;
            default:
                paddle = null;
        }

        if(paddle){
            let relativeZ = this.objects.ball.obj.position.z - paddle.obj.position.z;
            let normalizedRelativeZ = 2*relativeZ / paddle.obj.geometry.parameters.depth;
            let bounceAngle = normalizedRelativeZ * this.objects.ball.maxBounceAngle;
            if(paddle.obj.uuid == this.objects.paddleL.obj.uuid){
                this.objects.ball.direction = bounceAngle;
            }else{
                this.objects.ball.direction = Math.PI - bounceAngle;
            }
        }



        this.objects.ball.update(el);
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
        this.objects.playerBoxes[player.uid] = new PlayerBox(player.side);
        this.scene.add(this.objects.playerBoxes[player.uid].obj);
    }
    removePlayerbox(uid){
        if(this.objects.playerBoxes[uid] != undefined){
            this.scene.remove(this.objects.playerBoxes[uid].obj);
        }
        delete this.objects.playerBoxes[uid];
    }

    movePlayerbox(id, position){
        this.objects.playerBoxes[id].move(position);
    }

    updatePlayerboxes(store){
        for (let i = 0; i < store.length; i++){
            if(this.objects.playerBoxes[store[i].uid] != undefined){
                this.objects.playerBoxes[store[i].uid].number = i;
            }
        }
    }



}

export default WebGL;