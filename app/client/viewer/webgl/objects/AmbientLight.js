import * as THREE from 'three';

export default class AmbientLight {

    constructor() {
        this.light = new THREE.AmbientLight(0x404040, 0.1); 
    }

}