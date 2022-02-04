import { Shape } from "../shape/shape";
import { TrianglePlayer } from "src/app/interfaces/interfaces";
import { CanvasService } from "src/app/services/canvas/canvas.service";

export class Triangle extends Shape {
    constructor(playerObj: TrianglePlayer, canvasAPI: CanvasService) {
        super("triangle", playerObj.color,canvasAPI);
    }
    public draw(){
        this.p5.color(this.getColor());

    }
}
