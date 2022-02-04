import { Shape } from "../shape/shape";
import { CanvasService } from "src/app/services/canvas/canvas.service";
import { SquarePlayer } from "src/app/interfaces/interfaces";

export class Square extends Shape {
    private width: number;
    constructor(playerObj: SquarePlayer, canvasAPI: CanvasService) {
        super("square", playerObj.color, canvasAPI);
        this.width = playerObj.width;
    }
    public getWidth() {
        return this.width;
    }
    public draw() {
        let vector = this.getVector();

        this.p5.color(this.getColor()); 
        this.p5.square(vector.x, vector.y, this.width);
    }
}
