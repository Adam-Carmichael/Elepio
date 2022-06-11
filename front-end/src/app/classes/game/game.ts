import { ShapePlayer } from "src/app/interfaces/interfaces";
import { CanvasService } from "src/app/services/canvas/canvas.service";
import { GameService } from "src/app/services/game/game.service";
import { Board } from "../board/board";

export class Game {
    private board: Board;
    
    constructor(private gameAPI: GameService, private canvasAPI: CanvasService) {
        this.board = new Board(gameAPI,canvasAPI);
    } 
    
    public getBoard(){
        return this.board;
    }

    public createNewPlayer(){
        var p5 = this.canvasAPI.getP5();

        var player = {
            "color": p5.random(["#a2d3aa", "#dda", "#ada", "#34d", "#aaa", "#09d", "f00"]),
            "board_id": this.board.getID(),
            "name": p5.random(["Jared", "Jade", "Luis", "Adam", "Rob", "Jack", "Jill"]) +"_"+ Math.floor(Math.random()*10),
            "pos_x": Math.floor(p5.random(this.board.getWidth())),
            "pos_y": Math.floor(p5.random(this.board.getHeight())),
            "radius": Math.floor(p5.random(5,40)),
            "type": "circle"
        };
        console.log("New Player:", player);
        this.gameAPI.createPlayer(player).subscribe((resp) =>{
            console.log(resp)
        }, (resp) => {
            console.error(resp);
        });
    }
    public logAllPlayers(){
        this.board.logCurrentPlayer();
        this.board.logEnemyPlayer();
    }
    public killAllPlayers(){
        var enemyPlayers = this.board.getEnemyPlayers();
        enemyPlayers.forEach((player) => {
            player?.setAsDead();
        });
    }
}