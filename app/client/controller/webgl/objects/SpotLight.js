import * as THREE from 'three';

export default class SpotLight {

    constructor() {
        this.obj = new THREE.SpotLight(0xffffff, 1);
        this.obj.position.set(5, 20, 5);
        this.obj.angle = Math.PI / 4;
        this.obj.penumbra = 0.05;
        this.obj.decay = 2;
        this.obj.distance = 200;
    }

}