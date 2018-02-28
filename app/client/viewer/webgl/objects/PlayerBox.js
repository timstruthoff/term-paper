import * as THREE from 'three';
import CONFIG from './../../../config';

export default class {

    constructor(side) {
        var material = new THREE.MeshPhongMaterial({
            color: CONFIG.LIGHT_COLOR,
            dithering: true
        });
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        this.obj = new THREE.Mesh(geometry, material);
        this.homePosZ = 0;
        if(side == 0){
            this.obj.position.set(-35, 2.5, this.homePosZ);
        }else if(side == 1){
            this.obj.position.set(35, 2.5, this.homePosZ);
        }
        this.obj.castShadow = true;
    }

    move(position){ //position information: 0..1
        this.obj.position.setZ(this.homePosZ + (position-0.5) * (CONFIG.PLAYINGFIELD_DEPTH - 1 - CONFIG.PADDLE_DEPTH));
    }

    set number(number){
        this.obj.position.y = number * 2 + 1.5;
    }
    get number(){
        return this.obj.position.y;
    }

}