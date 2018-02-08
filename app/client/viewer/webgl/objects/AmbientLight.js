import * as THREE from 'three';

export default class AmbientLight {

    constructor() {
        this.obj = new THREE.AmbientLight(0xffffff, 0.1);
    }

}