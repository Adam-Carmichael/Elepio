import { BoardResponse, CreatedPlayerResponse, CreatePlayerPayload, ShapeObject, PlayerResponse, ShapePlayer, ShapeType, WebSocketPlayersResponse, BoardPlayers, WebSocketPlayerUpdateResponse } from "src/app/interfaces/interfaces";
import { GameService } from "src/app/services/game/game.service";
import { CanvasService } from "src/app/services/canvas/canvas.service";
import p5 from "p5";

import { interval, of, pipe, Subscription } from "rxjs";
import { map, takeWhile } from "rxjs/operators";

import { CirclePlayer } from "../circle/circle-player";

import { environment } from "src/environments/environment";
import config from "src/assets/config.json";
import { Shape } from "../shape/shape";

export class Board {
    private p5: p5;

    private color: string = config.boardColor;
    private width: number = 0;
    private height: number = 0;
    private id: string = "";

    private lineColor = config.boardLineColor;
    private zoomScale: number = config.zoomScale;

    private currentPlayer: ShapePlayer | null = null;

    private players: BoardPlayers = {}
    private playerUpdateInterval: any;

    constructor(private gameAPI: GameService, private canvasAPI: CanvasService, boardInfo?: BoardResponse| null) {
        this.p5 = this.canvasAPI.getP5();

        boardInfo = boardInfo ? boardInfo : this.getDefaultBoard();

        this.color = boardInfo.bg_color;
        this.width = boardInfo.width;
        this.height = boardInfo.height;
        this.id = boardInfo._id.$oid;

        this.createCurrentPlayer();

        //Update PLayer Information
        this.playerUpdateInterval = interval(environment.apiInterval)
            .subscribe(() => {
                this.getUpdatedPlayers();
                this.updateCurrentPlayer();
            });

        this.updateP5methods();

    }


    private createCurrentPlayer(playerInfo?: CreatePlayerPayload) {
        playerInfo = playerInfo || this.getDefaultPlayerPayload();

        this.gameAPI.createPlayer(playerInfo).subscribe(
            (response) => {
                let playerCreated: WebSocketPlayersResponse | null = response.body;
                if (playerCreated) {
                    this.setPlayerObjects([playerCreated]);
                    this.currentPlayer = this.players[playerCreated._id.$oid];
                    this.players[playerCreated._id.$oid].setAsCurrentPlayer();
                }
                else {
                    this.currentPlayer = null;
                }
            },
            (response) => {
                this.gameAPI.handleError(response);
                this.currentPlayer = null;
            }
        );
    }

    private updateCurrentPlayer() {
        if (this.currentPlayer && this.currentPlayer.isAlive()) {
            this.gameAPI.updatePlayerOnBoardWS(this.currentPlayer.getID(), this.currentPlayer.getData()).subscribe(
                (success: any) => {
                    //console.log("Update Player WS Success", success);

                    //var playerUpdated: WebSocketPlayerUpdateResponse | null = success.body;
                    //this.setPlayerObjects(success.body);
                },
                (error: any) => {
                    //console.log("Update Player WS Error", error);
                }
            )
        }
    }

    private getUpdatedPlayers() {
        this.gameAPI.getPlayersOnBoardWS(this.id)?.subscribe(
            (success) => {
                var response: Array<WebSocketPlayersResponse> = JSON.parse(success.data);
                this.setPlayerObjects(response);
            },
            (error) => {
                this.players = {};
            }
        );
    }

    
    public getID() {
        return this.id;
    }
    public getWidth() {
        return this.width;
    }
    public getHeight() {
        return this.height;
    }
    public getZoomScale() {
        return this.zoomScale;
    }
    public setZoomScale(zoomScale: number) {
        if (zoomScale < 1) {
            return;
        }
        this.zoomScale = zoomScale;
    }

    public getPlayerCount() {
        return Object.keys(this.players).length;
    }
    public getEnemyPlayers() {
        var board = this;
        var enemyPlayers = Object.keys(board.players).map(function (key) {
            if (board.players[key].isCurrentPlayer()) {
                return;
            }

            return board.players[key];
        });

        return enemyPlayers;
    }
    public getAllPlayers() {
        var board = this;
        var allPlayers = Object.keys(board.players).map(function (key) {
            return board.players[key];
        });
        return allPlayers;
    }

    private getDefaultPlayerPayload(): CreatePlayerPayload {
        var player = {
            "color": "#f00",
            //"color": this.p5.random(["#a2d3aa", "#dda", "#ada", "#34d", "#aaa", "#09d", "#f00"]),
            "board_id": this.id,
            "name": this.p5.random(["Jared", "Jade", "Luis", "Adam", "Rob", "Jack", "Jill"]) + "_" + Math.floor(Math.random() * 10),
            "pos_x": Math.floor(this.p5.random(this.width)),
            "pos_y": Math.floor(this.p5.random(this.height)),
            "radius": Math.floor(this.p5.random(5, 40)),
            "type": "circle"
        };
        console.log(player);

        return player;
    }

    private getDefaultBoard(): BoardResponse {
        var board = {
            "_id": {
                "$oid": "test"
            },
            "active": true,
            "bg_color": this.p5.random(["#a2d3aa", "#dda", "#ada", "#34d", "#aaa", "#09d", "f00"]),
            "height": Math.floor(this.p5.random(9000, 15000)),
            "width": Math.floor(this.p5.random(1000, 5000)),
            "player_count": 1,
            "player_max": 100
        };

        console.log(board);
        return board;
    }

    private setPlayerObjects(playersJSON: Array<WebSocketPlayersResponse> | null) {
        if (!playersJSON || playersJSON.length < 1) {
            return;
        }

        playersJSON.forEach(player => {
            let playerData: ShapeObject = {
                id: player._id.$oid,
                type: <ShapeType>player.type,
                radius: player.radius,
                color: player.color,
                pos_x: player.pos_x,
                pos_y: player.pos_y,
            }


            //Update PLayer 
            if (this.players.hasOwnProperty(playerData.id)) {
                if (this.players[playerData.id] == this.currentPlayer) {
                    return;
                }
                this.players[playerData.id].updateData(playerData);
            }
            //Create Player
            else {
                this.players[playerData.id] = new CirclePlayer(playerData, this.canvasAPI, this.gameAPI);
            }
        });
    }

    public updateBoard(boardInfo: BoardResponse) {
        this.width = boardInfo.width ? boardInfo.width : this.width;
        this.height = boardInfo.height ? boardInfo.height : this.height;
        this.color = boardInfo.bg_color ? boardInfo.bg_color : this.color;
    }

    public logCurrentPlayer() {
        if (!this.currentPlayer) {
            console.log("No Player");
            return "No PLayer";
        }

        console.log(this.currentPlayer);
        return this.currentPlayer;
    }

    public logEnemyPlayer() {
        console.log("Enemy Players", this.getEnemyPlayers());
    }

    private boardSetup() {
        return () => {
            if (!this.p5) {
                return;
            }

            let width = this.p5.windowWidth;
            let height = this.p5.windowHeight;


            console.log("P5 WIDTH: %s", width);
            console.log("P5 HEIGHT: %s", height);


            this.p5.createCanvas(width, height);
            this.p5.fill(this.p5.color(this.lineColor));

            this.p5.line(0, 0, width, 0);
            this.p5.line(0, 0, 0, height);
            this.p5.line(width, 0, width, height);
            this.p5.line(0, height, width, height);

            console.log("Setup window height/width", width + "," + height);
        }
    }

    public drawGrid() {
        //this.p5.translate((this.p5.width / 4), (this.p5.height / 4));

        this.p5.fill(this.p5.color(config.boardLineColor));

        let canvasWidth = this.width;
        let canvasHeight = this.height;

        let interval_x = 100 || canvasWidth / 10;
        let interval_y = 100 || canvasHeight / 10;

        for (let i = 0; i < (canvasWidth); i += interval_x) {
            this.p5.line(i, 0, i, canvasHeight);
        }
        for (let i = 0; i < (canvasHeight); i += interval_y) {
            this.p5.line(0, i, canvasWidth, i);
        }


        this.p5.fill(this.p5.color("#000"));
        this.p5.line(this.width, 0, this.width, this.height);
    }
    public drawHungerBar() {
        this.p5.rect(20, 20, 500, 75);
        this.p5.fill(this.p5.color(config.hungerBarColor));
        this.p5.rect(20, 20, 100, 75);
    }

    //Translate other elements on the board to have the player always centered
    private translateBoard(shapeElement: Shape | null) {
        if (!shapeElement) {
            return;
        }

        this.p5.translate((this.p5.width / 2), (this.p5.height / 2));

        this.setZoomScale(
            this.p5.lerp(
                this.getZoomScale(),
                (config.playerZoomScaleEffect / shapeElement.getZoomEffectDivider()),
                0.1
            )
        )

        this.p5.scale(this.getZoomScale());
        this.p5.translate(-shapeElement.getPosX(), -shapeElement.getPosY());
    }

    private updateP5methods() {
        var p = this.p5;

        p.draw = () => {
            if (true || p.millis() % 1000 == 0) {

                //Reset Background
                p.background(p.color("#fff"));

                //Draw Hunger Bar
                this.drawHungerBar();

                //Draw grid

                //Update Player Position
                this.currentPlayer?.updatePosition();

                //Translate Board to have the player centered amongst all the other elements
                this.translateBoard(this.currentPlayer);

                //Draw Player
                this.drawGrid();

                this.currentPlayer?.draw();

                //Update enemy player "alive" status and draw if alive
                for (let player_id in this.players) {
                    if (this.players.hasOwnProperty(player_id) && !this.players[player_id].isCurrentPlayer()) {
                        let enemyPlayer = this.players[player_id]
                        if (this.currentPlayer?.eatsPlayer(enemyPlayer)) {
                            enemyPlayer.setAsDead();
                        }
                        enemyPlayer.draw();
                    }
                }

                //Launch projectiles
                if (p.keyIsDown(config.projectileButton)) {
                    this.currentPlayer?.launchProjectile();
                }
            }

        }

    }

    public test() {
        this.p5.draw = () => {
            //Reset Background
            console.log("TEST COLOR", this.color)
            this.p5.background(this.p5.color(this.color));


            this.p5.fill(this.p5.color("#a03"));
            this.p5.ellipse(this.p5.mouseX, this.p5.mouseY, 80, 80);
        }
    }
}