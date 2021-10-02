import { GameService } from "src/app/services/game/game.service";
import { CanvasService } from "src/app/services/canvas/canvas.service";

import p5 from "p5";
import * as boardInfo from "../../demo_data/board.json";

import { Player } from "../player/player";

import { IPlayer } from "src/app/interfaces/interfaces";
import { Circle } from "../circle/circle";

export class Board {
    private p5: p5;

    private boardInfo: any;
    private color: string;
    private width: number;
    private height: number;

    private currentPlayer: Player;
    private enemyPlayers: Array<Player>;
    private zoomScale:number = 1;

    constructor(private gameAPI: GameService, private canvasAPI: CanvasService) {
        this.boardInfo = this.getBoardInfo();
        this.color = this.boardInfo.board.color;
        this.width = this.boardInfo.board.width;
        this.height = this.boardInfo.board.height;

        this.currentPlayer = new Player(this.boardInfo.currentPlayer, this.canvasAPI);
        this.enemyPlayers = this.boardInfo.enemyPlayers.map((player: IPlayer) => {
            return new Player(player, this.canvasAPI);
        });

        this.p5 = canvasAPI.getP5();
        this.updateP5methods();
    }

    private getBoardInfo(createNewPlayer?: boolean) {
        /*
        //Make API call to populate board data - players and details
        //Signal to server to create a new player on first load
        this.gameAPI.getBoardInfo(createNewPlayer).subscribe(
            (result) => {
                console.log(result);
                return result || {};
            }
        );
         */
        return boardInfo;
    }

    private updateGameDataFromBoardInfo() {
        return 0;
    }

    private updateP5methods() {
        let p = this.p5;
        
        p.setup = () => {
            p.createCanvas(this.height, this.width);
            p.background(0);
            p.fill(p.color(this.color));
        }

        p.draw = () => {
            //Reset Background
            p.background(0);
            
            //TODO: Send user the location of the mouse
            //server will upate the location
            let velocity_x = p.mouseX - (p.width / 2);
            let velocity_y = p.mouseY - (p.height / 2);
            let velocity = this.p5.createVector(velocity_x, velocity_y);
            this.currentPlayer.updatePlayerPosition(velocity);
            
            
            var player_object = this.currentPlayer.getPlayerObject();
            if(player_object instanceof Circle){
                p.translate(p.width/2, p.height/2);
                var newZoomScale = (64/player_object.getRadius());
                this.zoomScale = p.lerp(this.zoomScale,newZoomScale,0.1)
                p.scale(this.zoomScale);
                p.translate(-this.currentPlayer.getPosX(),-this.currentPlayer.getPosY());
            }
            else{
                let translate_x = (p.width / 2) - this.currentPlayer.getPosX();
                let translate_y = (p.height / 2) - this.currentPlayer.getPosY();
                p.translate(translate_x, translate_y);
            }


            this.enemyPlayers.forEach(enemyPlayer => {
                enemyPlayer.draw();
            });
            this.currentPlayer.draw();


            for (let i = 0; i < this.enemyPlayers.length; i++) {
                let enemyPlayer = this.enemyPlayers[i];
                if(this.currentPlayer.intersectsPlayer(enemyPlayer)){
                    enemyPlayer.died();
                }
            }
        }
    }

    public test() {
        this.p5.draw = () => {
            //Reset Background
            this.p5.background(0);

            this.p5.fill(this.p5.color("#a03"));
            this.p5.ellipse(this.p5.mouseX, this.p5.mouseY, 80, 80);
        }
    }
}