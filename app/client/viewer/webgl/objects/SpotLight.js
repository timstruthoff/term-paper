import * as THREE from 'three';

export default class SpotLight {

    constructor() {
        this.light = new THREE.SpotLight(0xffffff);
        this.light.position.set(20, 30, 20);
        this.light.angle = 0.714;
        this.light.target.position.set(0,0,0)

        this.light.castShadow = true;

        /*this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;

        this.light.shadow.camera.near = 500;
        this.light.shadow.camera.far = 4000;
        this.light.shadow.camera.fov = 30;

        this.light.angle = 0.714;
        this.light.penumbra = 0.0;
        this.light.decay = 2;
        this.light.distance = 0;*/

        this.helper = new THREE.SpotLightHelper(this.light);
        this.shadowHelper = new THREE.CameraHelper( this.light.shadow.camera );
    }

}