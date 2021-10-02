import { ViewChild, ElementRef } from "@angular/core";
import { CanvasService } from "src/app/services/canvas/canvas.service";
import { GameService } from "src/app/services/game/game.service";

import { Board } from "../board/board";

export class Game {
    private board: Board;
    constructor(private gameAPI: GameService, private canvasAPI: CanvasService) {
        this.board = new Board(gameAPI,canvasAPI);
    }  
    public test(){
        this.board.test();
    }
}