import * as THREE from 'three';

export default class {

    constructor(side) {
        var material = new THREE.MeshPhongMaterial({
            color: 0x4080ff,
            dithering: true
        });
        var geometry = new THREE.BoxGeometry(1, 1, 4);
        this.obj = new THREE.Mesh(geometry, material);
        this.homePosZ = 0;
        this.lengthOfTravelZ = 40;
        if(side == 0){
            this.obj.position.set(-30.5, 0.5, this.homePosZ);
        }else if(side == 1){
            this.obj.position.set(30.5, 0.5, this.homePosZ);
        }
        this.obj.castShadow = true;
    }

    move(position){ //position information: 0..1
        this.obj.position.setZ(this.homePosZ + (position-0.5) * this.lengthOfTravelZ);
    }

    set color (color) {
        this.obj.material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(color),
            dithering: true
        });
    }

}