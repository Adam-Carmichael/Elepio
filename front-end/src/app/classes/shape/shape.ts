import { ShapeType } from 'src/app/interfaces/interfaces';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import p5 from "p5";

export abstract class Shape {
    //Same as private = #
    protected vector: p5.Vector;
    protected p5: p5;
    protected zoomEffectDivider: number = 1;

    protected constructor(
        protected readonly type: ShapeType,
        protected color: string,
        protected canvasAPI: CanvasService
    ) {
        this.p5 = canvasAPI.getP5();
        this.vector = this.p5.createVector();
    }

    getType(): ShapeType {
        return this.type;
    }

    getColor(): string {
        return this.color;
    }

    getVector() {
        return this.vector;
    }

    getPosX() {
        return this.vector.x;
    }

    getPosY() {
        return this.vector.y;
    }

    getZoomEffectDivider() {
        return this.zoomEffectDivider;
    }

    setVector(vector: p5.Vector) {
        this.vector = vector;
    }
    
    inCanvas(vector?: p5.Vector){
        vector = vector ? vector : this.getVector();
        var inHorizontal = (vector.x >= 0) && (vector.x <= this.p5.width);
        var inVertical = (vector.y >= 0) && (vector.y <= this.p5.height); 
        return inHorizontal && inVertical;
    }
    

    abstract draw():any;
}
