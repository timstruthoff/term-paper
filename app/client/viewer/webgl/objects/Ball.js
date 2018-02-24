import * as THREE from 'three';

export default class {

    constructor() {
        var material = new THREE.MeshPhongMaterial({
            color: 0x4080ff,
            dithering:true
        });
        var geometry = new THREE.CylinderGeometry(0.5,0.5, 0.3, 12, 2);
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.castShadow = true;

        this.speed = 7; // becoming buggy at ~40+
        this.reset();
        this.maxBounceAngle = (75/180*Math.PI);

    }

    update(deltaTime){
        if(deltaTime == undefined){deltaTime = 0;}
        let deltaX = deltaTime * this.speed * Math.cos(this.direction);
        let deltaZ = deltaTime * this.speed * Math.sin(this.direction);
        this.obj.position.x += deltaX;
        this.obj.position.z += deltaZ;
    }

    reset(){
        this.obj.position.set(0,0.15,0);
        this.direction = (Math.random() < 0.5) ? Math.PI : 0;
    }

    touches(collidableMeshList){
        let helpers = [];
        for (var vertexIndex = 0; vertexIndex < this.obj.geometry.vertices.length; vertexIndex++)
        {
            let curVertex = this.obj.geometry.vertices[vertexIndex];

            let vertexVector = curVertex.clone();
            vertexVector.applyMatrix4(this.obj.matrix);
            let positionVector = this.obj.position.clone();
            let directionVector = vertexVector.clone().sub(positionVector);
            let directionVectorNormalized = directionVector.clone().normalize();

            //----------- helpers -------------
            /*let material = new THREE.MeshPhongMaterial({
                color: 0xff0000,
                dithering: true
            });
            let geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
            let point = new THREE.Mesh(geometry, material); 
            point.position.set(vertexVector.x, vertexVector.y, vertexVector.z);         

            helpers.push({
                arrow: new THREE.ArrowHelper( directionVectorNormalized, positionVector, 2 ),
                point: point
            });*/

            //----------------- raycasting ------
            let ray = new THREE.Raycaster(positionVector, directionVectorNormalized);
            let collisionResults = ray.intersectObjects(collidableMeshList);

            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
            {
                return collisionResults[0].object.uuid;
            }



        }

    }

}