import * as THREE from 'three';

export default class SpotLight {

    constructor() {
        this.obj = new THREE.SpotLight(0xffffff, 1);
        this.obj.position.set(30, 60, 60);
        this.obj.angle = Math.PI / 4;
        this.obj.penumbra = 0.05;
        this.obj.decay = 2;
        this.obj.distance = 200;
        this.obj.castShadow = true;
        this.obj.shadow.mapSize.width = 1024;
        this.obj.shadow.mapSize.height = 1024;
        this.obj.shadow.camera.near = 10;
        this.obj.shadow.camera.far = 200;
    }

}