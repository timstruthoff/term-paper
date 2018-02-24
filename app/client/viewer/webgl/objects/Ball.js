import * as THREE from 'three';

export default class {

    constructor() {
        var material = new THREE.MeshBasicMaterial({
            color: 0x4080ff,
            wireframe:true
        });
        var geometry = new THREE.CylinderGeometry(0.5,0.5, 0.3, 12, 2);
        this.obj = new THREE.Mesh(geometry, material);
        this.obj.position.set(0,0.3,0);
        this.obj.castShadow = true;

        this.speed = 1; // becoming buggy at ~40+
        this.direction = (Math.random() < 0.5) ? Math.PI : 0;
        this.maxBounceAngle = (75/180*Math.PI);

    }

    update(deltaTime){
        if(deltaTime == undefined){deltaTime = 0;}
        let deltaX = deltaTime * this.speed * Math.cos(this.direction);
        let deltaZ = deltaTime * this.speed * Math.sin(this.direction);
        this.obj.position.x += deltaX;
        this.obj.position.z += deltaZ;
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
                this.direction += Math.PI;
                return collisionResults[0].object.uuid;
            }



        }

    }

}