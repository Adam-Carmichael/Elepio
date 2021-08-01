import { ViewChild, ElementRef } from "@angular/core";
import { Player } from "../player/player";
import * as p5 from "p5";
import * as boardInfo from "../../demo_data/board.json";
import { Direction } from "../../interfaces/common.interface";
import { Square } from "../square/square";
import { GameUpdatesService } from "src/app/services/game-updates.service";
import { Player as PlayerInterface } from "src/app/interfaces/player.interface";


export class Game {
    private p5: any;

    private background_color: string;
    private board_width: string;
    private board_height: string;
    private players: Array<Player> = [];
    private currentPlayer: PlayerInterface;

    constructor(private gameAPI: GameUpdatesService) {
        let createNewPlayer = true;
        let boardInfo = this.getBoardInfo(createNewPlayer);

        this.currentPlayer = boardInfo.newPlayer;
        this.background_color = boardInfo.board.background_color;
        this.board_width = boardInfo.board.width;
        this.board_height = boardInfo.board.height;

        this.players = this.createPlayerObjects(boardInfo.players);

        this.createCanvas();
    }

    private getBoardInfo(createNewPlayer?:boolean) {
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

    private updateGameDataFromBoardInfo(){
        return 0;
    }

    private createPlayerObjects(players: Array<any>): Array<Player> {
        var player_objects: Array<Player> = [];
        players.forEach((player) => {
            let player_object = new Player(player);
            player_objects.push(player_object);
        });
        return player_objects;
    }

    private createCanvas() {
        this.p5 = new p5((p) => {
            p.preload = () => {}

            p.setup = () => {
                console.log(p);

                p.createCanvas(this.board_height,this.board_width);
                p.background(0);
                p.fill(255);
            }

            p.draw = () => {
                //Reset Background
                p.background(0);


                this.players[0].x += 10; 
                //TODO: Send user the location of the mouse
                //server will upate the location
                this.gameAPI.updatePlayerLocation();

                for (var player of this.players) {
                    p.fill(player.color);
                    p.rect(player.x, player.y, player.player_object.width, player.player_object.width);
                }
            }

        });



    }






    //canvas.parent("game-space-container");

    //p.strokeWeight();
    //p.rect()
    //p.ellipse vs circle
    //p.stroke();
    //p.mouseIsPressed && s.mouseButton && s.mouseX && s.pmouseX && s.mouseReleased && s.keyPressed

// p.windowHeight p.windowWidth







    /*
    
        private redrawGame() {
            this.context = this.getContext();
            this.clearCanvas();
    
            this.players.forEach((player) => {
                this.context = this.getContext();
                this.drawPlayer(player);
            });
        }
    
        private getContext() {
            //return this.canvas.nativeElement.getContext("2d");
        }
        private clearCanvas() {
            //this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        }
        private drawPlayer(player: Player) {
            this.drawCirclePlayer(player);
        }
    
        public addPlayer(player: Player) {
            this.players.push(player);
            this.context = this.getContext();
            this.drawPlayer(player);
        }
        public updateCurrentPlayer(direction: Direction) {
            this.players.forEach((player, i) => {
                if (player.isCurrentPlayer()) {
                    player.updatePlayer(direction);
                }
            });
            this.redrawGame();
        }
        public drawCirclePlayer(player: Player) {
            this.context = this.getContext();
            this.context.beginPath();
            this.context.arc(player.getPosX(), player.getPosY(), player.getWidth() / 2, 0, 2 * Math.PI);
            this.context.fill();
        }
        public drawSquarePlayer(player: Player) {
            this.context.fillRect(player.getPosX(), player.getPosY(), player.getWidth(), player.getHeight());
        }
    
    */
}
