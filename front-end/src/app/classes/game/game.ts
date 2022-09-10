import p5 from "p5";
import { BoardResponse, ShapePlayer } from "src/app/interfaces/interfaces";
import { CanvasService } from "src/app/services/canvas/canvas.service";
import { GameService } from "src/app/services/game/game.service";
import { Board } from "../board/board";

import { interval } from "rxjs";

export class Game {
    private board: Board | null = null;
    private p5: p5;

    constructor(private gameAPI: GameService, private canvasAPI: CanvasService) {
        let canvasParent = document.getElementById("canvas-area") || undefined;

        this.p5 = new p5((p: p5) => {
            p.preload = () => {
                //Get First Active Board Information from Server and create client objects
                //Only works for synchronous items
                //maybe?: p.loadJSON(GET restpAPI URL)
            }
            p.setup = () => {
                this.gameAPI.getFirstActiveBoard().subscribe(
                    (response1) => {
                        this.createBoard(response1.body);
                    },
                    (response1) => {
                        this.gameAPI.createBoard().subscribe((response2) => {
                          this.createBoard(response2.body);
                        });
                    }
                );
            }
        }, canvasParent);

        //resizeCanvas
        this.canvasAPI.setP5(this.p5);
    }

    hasBoard() {
        return !!this.board;
    }



    private async createBoard(boardInfo: BoardResponse | null) {
        if (!boardInfo) {
            return;
        }

        this.board = new Board(this.gameAPI, this.canvasAPI, boardInfo);

        console.log(this.board?.getWidth())
        console.log(this.board?.getHeight());
        let lineColor = "#eee";
        var myCanvas = this.p5.createCanvas(this.board?.getWidth(), this.board?.getHeight())
        
  var x = (this.p5.windowWidth - this.p5.width) / 2;
  var y = (this.p5.windowHeight - this.p5.height) / 2;
  var currPos = myCanvas.position();
  //myCanvas.position(x, currPos.y);

  myCanvas.style("border","1px solid red")

        
        //boardInfo.width, boardInfo.height);
        //myCanvas.parent("canvas-area");

        this.p5.fill(this.p5.color(lineColor));

        this.p5.line(0, 0, this.board?.getWidth() || 0, 0);
        this.p5.line(0, 0, 0, this.board?.getHeight() || 0);
        this.p5.line(this.board?.getWidth() || 0, 0, this.board?.getWidth() || 0, this.board?.getHeight() || 0);
        this.p5.line(0, this.board?.getHeight() || 0, this.board?.getWidth() || 0, this.board?.getHeight() || 0);

    }



    public getBoard() {
        return this.board;
    }

    public createNewPlayer() {
        var p5 = this.canvasAPI.getP5();

        var player = {
            "color": p5.random(["#a2d3aa", "#dda", "#ada", "#34d", "#aaa", "#09d", "f00"]),
            "board_id": this.board?.getID() || "",
            "name": p5.random(["Jared", "Jade", "Luis", "Adam", "Rob", "Jack", "Jill"]) + "_" + Math.floor(Math.random() * 10),
            "pos_x": Math.floor(p5.random(this.board?.getWidth())),
            "pos_y": Math.floor(p5.random(this.board?.getHeight())),
            "radius": Math.floor(p5.random(5, 40)),
            "type": "circle"
        };
        console.log("New Player:", player);
        this.gameAPI.createPlayer(player).subscribe((resp) => {
            console.log(resp)
        }, (resp) => {
            console.error(resp);
        });
    }

    public logAllPlayers() {
        this.board?.logCurrentPlayer();
        this.board?.logEnemyPlayer();
    }

    public killAllPlayers() {
        var enemyPlayers = this.board?.getEnemyPlayers();
        enemyPlayers?.forEach((player) => {
            player?.setAsDead();
        });
    }
}