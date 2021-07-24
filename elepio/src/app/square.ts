import { ShapeType } from "./interfaces/common.interface";
import { Shape } from "./shape";

export class Square extends Shape {
    constructor(
        color:string,
        private width:string,
        private height:string){
        super("square",color);
    }
}
