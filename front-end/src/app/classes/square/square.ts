import { Shape } from "../shape/shape";

import { IShape, ISquare } from "src/app/interfaces/interfaces";

export class Square extends Shape {
    private width: number;
    constructor(playerObj: ISquare) {
        super("square", playerObj.color);
        this.width = playerObj.width;
    }
    public getWidth() {
        return this.width;
    }
}
