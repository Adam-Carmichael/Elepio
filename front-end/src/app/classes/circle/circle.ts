import { Shape } from "../shape/shape";
import { CircleObject } from "src/app/interfaces/interfaces";
import { CanvasService } from "src/app/services/canvas/canvas.service";
import p5 from "p5";


export class Circle extends Shape {
    protected radius: number = 5;

    constructor(circleObj: CircleObject, canvasAPI: CanvasService) {
        super("circle", circleObj.color, canvasAPI);
        this.radius = circleObj.radius;
        this.setVector(this.p5.createVector(circleObj.pos_x, circleObj.pos_y));
    }
    public getRadius() {
        return this.radius;
    }
    public incrementRadius(increment: number) {
        this.radius += increment;
    }


    public draw() {
        this.p5.fill(this.p5.color(this.getColor()));

        this.p5.circle(this.vector.x, this.vector.y, (this.radius * 2));
        this.p5.fill(this.p5.color(this.getColor()));
        this.p5.circle(this.vector.x, this.vector.y, 1);
        
        this.p5.fill(this.p5.color("#000"));
        this.p5.text(`${Math.floor(this.vector.x)},${Math.floor(this.vector.y)}`,this.vector.x,this.vector.y);

        return;
    }

    /*
    public draw() {
        let vector = this.getVector();

        this.p5.color(this.getColor());


        console.log("PLAYER COLOR:", this.getColor());
        console.log("PLAYER VECTOR:", this.getVector());

        this.p5.circle(vector.x, vector.y, vector.z);

        this.p5.fill(this.p5.color(255, 0, 0));
        this.p5.circle(vector.x, vector.y, 1);
    }
    */
}
