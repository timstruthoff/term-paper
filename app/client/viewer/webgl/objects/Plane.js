import * as THREE from 'three';

export default class Plane {

    constructor() {
        var geometry = new THREE.PlaneGeometry(40, 20, 0);
		var material = new THREE.MeshBasicMaterial({color: 0xffffff});
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.set(THREE.Math.degToRad(-90), 0,0);

        this.mesh.receiveShadow = true;
    }

}