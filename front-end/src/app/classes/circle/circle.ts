import { Shape } from "../shape/shape";
import { ICircle } from "src/app/interfaces/interfaces";

export class Circle extends Shape{
    private radius: number = 5;
    constructor(playerObj: ICircle) {
        super("circle", playerObj.color);
        this.radius = playerObj.radius;
    }
    public getRadius(){
        return this.radius;
    }
    public incrementRadius(increment:number){
        this.radius += increment;
    }
}
