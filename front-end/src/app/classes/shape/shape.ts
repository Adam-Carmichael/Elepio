import { ShapeType } from '../../interfaces/common.interface';

export class Shape {
    //Same as private = #
    protected constructor(
        protected readonly type:ShapeType,
        protected color:string){
      
    }
}
