import p5 from "p5";
import { Board } from "../classes/board/board";
import { CirclePlayer } from "../classes/circle/circle-player";


export interface WS_Message {
    source: string;
    content: string;
}


export interface BoardPlayers { 
    [key: string]: ShapePlayer 
}


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

export type ShapeType = "square" | "circle" | "triangle";
export type ShapePlayer = CirclePlayer;

/**
 * API Call Interfaces
 */
export interface WebSocketPlayersMessage {
    body: {
        id: string
    }
}

export interface WebSocketPlayersResponse {
    _id: {
        $oid: string
    },
    board_id: {
        $oid: string
    },
    color: string,
    name: string,
    pos_x: number,
    pos_y: number,
    radius: number,
    type: string
}

export interface WebSocketPlayerUpdateResponse{
    _id: {
        $oid: string
    },
    board_id: {
        $oid: string
    },
    color: string,
    name: string,
    pos_x: number,
    pos_y: number,
    radius: number,
    type: string
}

export interface WebSocketPlayerMessage {
    id: string,
    color?: string,
    name?: string,
    pos_x: number,
    pos_y: number,
    radius?: number

}


export interface BoardResponse {
    _id: {
        $oid: string
    },
    active: boolean,
    bg_color: string,
    height: number,
    width: number,
    player_count: number,
    player_max: number
};

//May be DEPRECATED
export interface PlayerResponse {
    _id: {
        $oid: string
    },
    board: number,
    color: string,
    name: string,
    pos_x: number,
    pos_y: number,
    radius: number,
    type: string
}
export interface CreatedPlayerResponse {
    _id: {
        $oid: string
    },
    board: number,
    color: string,
    name: string,
    pos_x: number,
    pos_y: number,
    radius: number,
    type: string
}



// export interface SquarePlayer {
//     type: ShapeType,
//     width: number,
//     height: number,
//     color: string,
//     pos_x: number,
//     pos_y: number,
// }

// export interface TrianglePlayer {
//     type: ShapeType,
//     base: number,
//     height: number,
//     color: string,
//     pos_x: number,
//     pos_y: number,
// }

export interface ShapeObject {
    id: string,
    type: ShapeType,
    radius?: number,
    color: string,
    pos_x: number,
    pos_y: number,
}


export interface PlayerMethods {
    //Get
    getID(): string,
    isAlive(): boolean,

    //Set
    setAsDead(): void,
    setAsCurrentPlayer(): void,

    //Player Rendering
    draw(): void,
    updatePosition(board: Board, velocity: p5.Vector): void,

    //Checks
    eatsPlayer(enemyPlayer: ShapePlayer): boolean,
    overlapsPlayer(enemyPlayer: ShapePlayer): boolean
}


export interface CreatePlayerPayload {
    color: string;
    board_id: string;
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
    color?: string;
    board?: string;
    name?: string;
    pos_x?: number;
    pos_y?: number;
    radius?: number;
    type?: string;
}


export interface AppConfig {
    elepioAPI: string,
    apiInterval: number,
    eatingIncSizeBy: number
}

