import p5 from "p5";
import { Board } from "../classes/board/board";
import { CirclePlayer } from "../classes/circle/circle-player";

export enum YesNo {
    yes = 'yes',
    no = 'no',
}
export enum TrueFalse {
    true = "true",
    false = "false"
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

export interface ILocation {
    pos_x: number,
    pos_y: number
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
export type ShapePlayer = SquarePlayer | TrianglePlayer | CircleObject;

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




/**
 * API Call Interfaces
 */

export interface BoardResponse {
    id: number,
    active: boolean,
    bg_color: string,
    height: number,
    width: number,
    player_count: number,
    player_max: number
};

export interface PlayerResponse {
    id: number;
    board: number;
    color: string;
    name: string;
    pos_x: number;
    pos_y: number;
    radius: number;
    type: string;
}
export interface CreatedPlayerResponse {
    board: number;
    color: string;
    id: number;
    name: string;
    pos_x: number;
    pos_y: number;
    radius: number;
    type: string;
}



export interface SquarePlayer {
    type: ShapeType,
    width: number,
    height: number,
    color: string,
    pos_x: number,
    pos_y: number,
}

export interface TrianglePlayer {
    type: ShapeType,
    base: number,
    height: number,
    color: string,
    pos_x: number,
    pos_y: number,
}

export interface CircleObject {
    type: ShapeType,
    radius: number,
    color: string,
    pos_x: number,
    pos_y: number,
}

export type Player = CirclePlayer;

export interface PlayerMethods {
    //Get
    getID(): number,
    isAlive(): boolean,

    //Set
    setAsDead(): void,
    setAsCurrentPlayer(): void,

    //Player Rendering
    draw(): void,
    updatePosition(board: Board, velocity: p5.Vector): void,

    //Checks
    withinBoard(board: Board, vector: p5.Vector): boolean,
    eatsPlayer(enemyPlayer: Player): boolean,
    overlapsPlayer(enemyPlayer: Player): boolean
}


export interface CreatePlayerPayload {
    color: string;
    board: number;
    name: string;
    pos_x: number;
    pos_y: number;
    radius: number;
    type: string;
}

export interface CreateBoardPayload {
    active: TrueFalse,
    bg_color: string,
    height: number,
    player_countr: number,
    player_max: number,
    width: number
}

export interface UpdatePlayerPayload {
    pos_x: number,
    pos_y: number
}


export interface AppConfig{
    elepioAPI: string,
    apiInterval: number,
    eatingIncSizeBy: number
}