import * as THREE from 'three';

export default class Cube {

    constructor() {
        var material = new THREE.MeshStandardMaterial({
            color: 0x4080ff,
            dithering: true
        });
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.position.set(0, 0, 0);
    }

}