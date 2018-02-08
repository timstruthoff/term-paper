import * as THREE from 'three';

export default class TestCube {

    constructor() {
        var geometry = new THREE.BoxGeometry(1, 1, 4);
		var material = new THREE.MeshBasicMaterial({color: 0xf48042});
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(-7, 0, 0);

        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
    }

}