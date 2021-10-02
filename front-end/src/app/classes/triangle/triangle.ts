import { Shape } from "../shape/shape";
import { IShape } from "src/app/interfaces/interfaces";

export class Triangle extends Shape {
    constructor(playerObj: IShape) {
        super("triangle", playerObj.color);
    }
}
