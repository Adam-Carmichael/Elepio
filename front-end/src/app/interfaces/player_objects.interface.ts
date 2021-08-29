import { ShapeType } from './common.interface';

export interface Shape{
    type: string,
    width: string,
    height: string
}

export interface Square {
    type: ShapeType,//.square,
    width: string,
    height: string
}

export interface Triangle {
    type: ShapeType,//.triangle,
    base: string,
    height: string
}

export interface Circle {
    type: ShapeType,//.circle,
    radius: string
}