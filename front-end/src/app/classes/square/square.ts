import { ShapeType } from "../../interfaces/common.interface";
import { Shape } from "../shape/shape";

export class Square extends Shape {
    constructor(
        color:string,
        public width:string,
        private height:string){
        super("square",color);
    }
}
