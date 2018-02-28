import * as THREE from 'three';
import CONFIG from './../../../config';

export default class Ground {

    constructor() {
        var material = new THREE.MeshPhongMaterial({
            color: CONFIG.DARK_COLOR,
            dithering: true
        });
        var geometry = new THREE.BoxGeometry(CONFIG.PLAYINGFIELD_WIDTH, 1, CONFIG.PLAYINGFIELD_DEPTH    );
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.position.set(0, -0.5, 0);
        this.obj.receiveShadow = true;
    }

}