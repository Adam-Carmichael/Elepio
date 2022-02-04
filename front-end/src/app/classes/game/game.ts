import { CanvasService } from "src/app/services/canvas/canvas.service";
import { GameService } from "src/app/services/game/game.service";
import { Board } from "../board/board";
import { Player } from "../player/player";

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
            "board": this.board.getID(),
            "name": p5.random(["Jared", "Jade", "Luis", "Adam", "Rob", "Jack", "Jill"]) +"_"+ Math.floor(Math.random()*10),
            "pos_x": Math.floor(p5.random(this.board.getWidth())),
            "pos_y": Math.floor(p5.random(this.board.getHeight())),
            "radius": Math.floor(p5.random(5,40)),
            "type": "circle"
        };
        console.log("New Player:", player);
        this.gameAPI.createPlayer(player);
    }
    public logAllPlayers(){
        this.board.logCurrentPlayer();
        this.board.logEnemyPlayer();
    }
    public killAllPlayers(){
        var enemyPlayers:Array<Player>= this.board.getEnemyPlayers();
        enemyPlayers.forEach((player) => {
            this.gameAPI.updatePlayerLocation(player.getID(),{
                pos_x:20,
                pos_y:20
            });
        })
    }
}