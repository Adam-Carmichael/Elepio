import {Shape} from "../Elepio/front-end/src/app/classes/shape/shape"
import { CanvasService } from "../Elepio/front-end/src/app/services/canvas/canvas.service";


class Player extends Shape{
    constructor(canvasAPI: CanvasService){
        super("circle", "#ddd", canvasAPI);
    }
    draw(){
        
    }
}