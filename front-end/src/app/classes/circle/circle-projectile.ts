import { Circle } from "./circle";
import { CircleObject } from "src/app/interfaces/interfaces";
import { CanvasService } from "src/app/services/canvas/canvas.service";

export class CircleProjectile extends Circle{

    constructor(circleObj: CircleObject, canvasAPI: CanvasService) {
        super(circleObj, canvasAPI);
        this.radius = circleObj.radius;
        this.setVector(this.p5.createVector(circleObj.pos_x, circleObj.pos_y));
    }
};