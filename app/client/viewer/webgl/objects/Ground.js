import * as THREE from 'three';

export default class Ground {

    constructor() {
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            dithering: true
        });
        var geometry = new THREE.BoxGeometry(100, 1, 75);
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.position.set(0, -0.5, 0);
        this.obj.receiveShadow = true;
    }

}