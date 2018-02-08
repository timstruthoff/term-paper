import * as THREE from 'three';

export default class Box {

    constructor() {
        var material = new THREE.MeshPhongMaterial({
            color: 0x4080ff,
            dithering: true
        });
        var geometry = new THREE.BoxGeometry(3, 1, 2);
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.position.set(-7, 0, 0);
        this.obj.castShadow = true;
    }

}