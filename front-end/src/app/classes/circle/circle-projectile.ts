import { Circle } from "./circle";
import { ShapeObject } from "src/app/interfaces/interfaces";
import { CanvasService } from "src/app/services/canvas/canvas.service";

export class CircleProjectile extends Circle{

    constructor(circleObj: ShapeObject, canvasAPI: CanvasService) {
        super(circleObj, canvasAPI);
        this.radius = circleObj.radius ? circleObj.radius : 10;
        this.setVector(this.p5.createVector(circleObj.pos_x, circleObj.pos_y));
    }

    updatePosition(){


    }

    public draw() {
        if(this.inCanvas()){
            super.draw();
            return true;
        }
        else{
            return false;
        }
    }
};