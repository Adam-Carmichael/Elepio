import { ShapeType } from 'src/app/interfaces/interfaces';

export class Shape {
    //Same as private = #
    protected constructor(
        protected readonly type: ShapeType,
        protected color:string){
    }
    public getType(): ShapeType{
        return this.type;
    }
    public getColor(): string{
        return this.color;
    }
}
