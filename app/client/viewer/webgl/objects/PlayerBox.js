import * as THREE from 'three';

export default class {

    constructor(side) {
        var material = new THREE.MeshPhongMaterial({
            color: 0x4080ff,
            dithering: true
        });
        var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        this.obj = new THREE.Mesh(geometry, material);
        this.homePosZ = 0;
        if(side == 0){
            this.obj.position.set(-12, 1, this.homePosZ);
        }else if(side == 1){
            this.obj.position.set(12, 1, this.homePosZ);
        }
        this.obj.castShadow = true;
    }

    move(position){ //position information: 0..1
        this.obj.position.setZ(this.homePosZ + (position-0.5) * 40);
    }

    set number(number){
        this.obj.position.y = number;
    }
    get number(){
        return this.obj.position.y;
    }

}