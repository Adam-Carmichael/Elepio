import { ShapeType } from './common.interface';

export interface Square {
    type: ShapeType,
    width: string,
    height: string
}

export interface Triangle {
    type: ShapeType,
    base: string,
    height: string
}

export interface Circle {
    type: ShapeType,
    radius: string
}