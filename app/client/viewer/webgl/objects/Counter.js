import * as THREE from 'three';
import CONFIG from './../../../config';
import helvetiker_regular from './../../../static/helvetiker_regular.typeface.json';

export default class{
    constructor(){
        this.leftPoints = 0;
        this.rightPoints = 0;
        this.position = new THREE.Vector3(0, 10, -50);
        this.marginX = 0;

        this.textProperties = {
            font: new THREE.Font(helvetiker_regular),
            size: 5,
            height: 1,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 5
        }
        this.material = new THREE.MeshPhongMaterial({
            color: CONFIG.LIGHT_COLOR,
            dithering: true
        });

        this.createColonGeometry();
        this.createLeftNumberGeometry();
        this.createRightNumberGeometry();
    }

    createColonGeometry(){
        let geometry = new THREE.TextGeometry( `:`, this.textProperties );
        geometry.computeBoundingBox();
        let width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;

        this.marginX = width/2 + 1;

        this.objColon = new THREE.Mesh(geometry, this.material);
        this.objColon.position.set(this.position.x - width / 2, this.position.y, this.position.z);
        this.objColon.castShadow = true;

    }

    createLeftNumberGeometry(){
        let geometry = new THREE.TextGeometry( `${this.leftPoints}`, this.textProperties );
        geometry.computeBoundingBox();
        let width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;

        this.objLeftNumber = new THREE.Mesh(geometry, this.material);
        this.objLeftNumber.position.set(this.position.x - width*1.15 - this.marginX, this.position.y, this.position.z);
        this.objLeftNumber.castShadow = true;
    }

    createRightNumberGeometry(){
        let geometry = new THREE.TextGeometry( `${this.leftPoints}`, this.textProperties );

        this.objRightNumber = new THREE.Mesh(geometry, this.material);
        this.objRightNumber.position.set(this.position.x + this.marginX, this.position.y, this.position.z);
        this.objRightNumber.castShadow = true;
    }



    updateLeft(){
        let geomUpdate = new THREE.TextGeometry( `${this.leftPoints}`, this.textProperties );
        geomUpdate.computeBoundingBox();
        let width = geomUpdate.boundingBox.max.x - geomUpdate.boundingBox.min.x; 
        this.objLeftNumber.position.set(this.position.x - width*1.15 - this.marginX, this.position.y, this.position.z);
        this.objLeftNumber.geometry = geomUpdate;
    }
    updateRight(){
        let geomUpdate = new THREE.TextGeometry( `${this.rightPoints}`, this.textProperties );
        this.objRightNumber.position.set(this.position.x + this.marginX, this.position.y, this.position.z);
        this.objRightNumber.geometry = geomUpdate;
    }
    increaseLeft(){
        this.leftPoints++;
        this.updateLeft();
    }
    increaseRight(){
        this.rightPoints++;
        this.updateRight();
    }
    reset(){
        this.leftPoints = 0;
        this.rightPoints = 0;
        this.updateLeft();
        this.updateRight();
    }
}