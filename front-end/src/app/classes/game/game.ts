import { ViewChild, ElementRef } from "@angular/core";
import { Player } from "../player/player";
import p5 from "p5";

import { GameUpdatesService } from "src/app/services/game-updates.service";
import { Player as PlayerInterface } from "src/app/interfaces/player.interface";
import { ShapeType } from "../../interfaces/common.interface";
import { Square } from "../square/square";

export class Game {
    private p5: any;

    private background_color: string;
    private board_width: string;
    private board_height: string;
    private players: Array<Player> = [];
    private currentPlayer: PlayerInterface;
    private boardInfo: any;

    constructor(private gameAPI: GameUpdatesService) {

        this.boardInfo = this.getBoardInfo();

        this.currentPlayer = this.boardInfo.currentPlayer[0];

        this.background_color = this.boardInfo.board.background_color;
        this.board_width = this.boardInfo.board.width;
        this.board_height = this.boardInfo.board.height;

        this.players = this.createPlayerObjects([this.boardInfo.currentPlayer]);

        this.createCanvas();
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
        return this.getJSONboard();
    }


    private updateGameDataFromBoardInfo() {
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
            p.preload = () => { }

            p.setup = () => {
                p.createCanvas(this.board_height, this.board_width);
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
                    if (player.player_object instanceof Square) {
                        p.rect(player.x, player.y, player.player_object.width, player.player_object.width);
                    }
                }
            }

        });
    }

    public getJSONboard() {
        return {
            "board": {
                "width": "500",
                "height": "500",
                "background_color": "black",
                "unique_id": "38f23eje",
                "obstacles": {},
                "active": true,
                "size": "100"
            },
            "newPlayer": {
                "name": "luis 2",
                "id": 4,
                "color": "125",
                "unique_id": "238e398hf",
                "player_location": {
                    "pos_x": 100,
                    "pos_y": 50
                },
                "player_object": {
                    "type": "square" as ShapeType,
                    "width": "20",
                    "height": "20"
                }
            },
            "currentPlayer":
            {
                "name": "luis",
                "id": 1,
                "color": "102",
                "player_location": {
                    "pos_x": 0,
                    "pos_y": 0
                },
                "player_object": {
                    "type": "square" as ShapeType,
                    "width": "20",
                    "height": "20"
                }
            },
            "players": [

                {
                    "name": "luis 2",
                    "id": 4,
                    "color": "125",
                    "player_location": {
                        "pos_x": 100,
                        "pos_y": 50
                    },
                    "player_object": {
                        "type": "square" as ShapeType,
                        "width": "20",
                        "height": "20"
                    }
                },
                {
                    "name": "luis 3",
                    "id": 5,
                    "color": "034",
                    "player_location": {
                        "pos_x": 50,
                        "pos_y": 100
                    },
                    "player_object": {
                        "type": "square" as ShapeType,
                        "width": "20",
                        "height": "20"
                    }
                },
                {
                    "name": "adam",
                    "id": 2,
                    "color": "191",
                    "player_location": {
                        "pos_x": 0,
                        "pos_y": 0
                    },
                    "player_object": {
                        "type": "circle" as ShapeType,
                        "radius": "10px"
                    }
                },
                {
                    "name": "dexter",
                    "id": 3,
                    "color": "200",
                    "player_location": {
                        "pos_x": 0,
                        "pos_y": 0
                    },
                    "player_object": {
                        "type": "triangle" as ShapeType,
                        "width": "20px"
                    }
                }
            ]
        }
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
