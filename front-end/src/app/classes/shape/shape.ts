import { ShapeType } from 'src/app/interfaces/interfaces';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import p5 from "p5";

export abstract class Shape {
    //Same as private = #
    protected vector: p5.Vector;
    protected p5: p5;

    protected constructor(
        protected readonly type: ShapeType,
        protected color:string,
        private canvasAPI: CanvasService       
        ){
            this.p5 = canvasAPI.getP5();
            this.vector = this.p5.createVector();
    }

    public getType(): ShapeType{
        return this.type;
    }

    public getColor(): string{
        return this.color;
    }

    public getVector(){
        return this.vector;
    }

    public getPosX(){
        return this.vector.x;
    }

    public getPosY(){
        return this.vector.y;
    }

    public setVector(vector: p5.Vector){
        this.vector = vector;
    }
    
    abstract draw():void;
}
