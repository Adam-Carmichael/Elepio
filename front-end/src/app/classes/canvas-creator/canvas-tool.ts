import p5 from "p5";

abstract class CanvasTool {
    public abstract factoryMethod(): any;
}

export class CanvasTool_P5 extends CanvasTool {
    public factoryMethod(): p5 {
        return new p5((p: any) => { });
    }
}
