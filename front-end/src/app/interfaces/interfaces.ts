export enum YesNo {
    yes = 'yes',
    no = 'no',
}

export enum Direction {
    up = "up",
    down = "down",
    left = "left",
    right = "right"
}

export interface IBoard {
    width: string,
    height: string,
    color: string
}

export interface ILocation{
    pos_x: number,
    pos_y:number
}

export interface IPlayer {
    id: number,
    name: string,
    color: string,
    unique_id?: string,
    player_object: ISquare | ITriangle | ICircle
}

export type IShape = ISquare | ITriangle | ICircle;
export type ShapeType = "square" | "circle" | "triangle";

export interface ISquare {
    type: ShapeType,
    width: number,
    height: number,
    color: string,
    pos_x: number,
    pos_y: number,
}

export interface ITriangle {
    type: ShapeType,
    base: number,
    height: number,
    color: string,
    pos_x: number,
    pos_y: number,
}

export interface ICircle {
    type: ShapeType,
    radius: number,
    color: string,
    pos_x: number,
    pos_y: number,
}