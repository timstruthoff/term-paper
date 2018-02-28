import * as THREE from 'three';
import CONFIG from './../../../config';

export default class {

    constructor(side) {
        var material = new THREE.MeshPhongMaterial({
            color: 0x4080ff,
            dithering: true
        });
        var geometry = new THREE.BoxGeometry(1, 1, CONFIG.PADDLE_DEPTH);
        this.obj = new THREE.Mesh(geometry, material);
        if(side == 0){
            this.obj.position.set(-30.5, 0.5, this.homePosZ);
        }else if(side == 1){
            this.obj.position.set(30.5, 0.5, this.homePosZ);
        }
        this.obj.castShadow = true;
    }

    move(position){ //position information: 0..1
        this.obj.position.setZ((position-0.5) * (CONFIG.PLAYINGFIELD_DEPTH - CONFIG.PADDLE_DEPTH));
    }

    set color (color) {
        this.obj.material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(color),
            dithering: true
        });
    }

}