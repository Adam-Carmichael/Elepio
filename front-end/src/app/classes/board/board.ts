import { BoardResponse, CreatedPlayerResponse, CreatePlayerPayload, PlayerResponse, ShapePlayer, ShapeType } from "src/app/interfaces/interfaces";
import { GameService } from "src/app/services/game/game.service";
import { CanvasService } from "src/app/services/canvas/canvas.service";
import { Player } from "../player/player";
import { Circle } from "../circle/circle";
import p5 from "p5";

import { interval, Subscription } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { environment } from "src/environments/environment";

import config from "src/assets/config.json";

export class Board {
    private p5: p5;

    private color: string = "#ddd";
    private width: number = 0;
    private height: number = 0;
    private id: number = -1;
    private lineColor = config.BoardLineColor;

    private currentPlayer: Player | null = null;
    private enemyPlayers: Array<Player> = [];
    private zoomScale: number = config.zoomScale;

    constructor(
        private gameAPI: GameService,
        private canvasAPI: CanvasService
    ) {

        this.p5 = this.canvasAPI.getP5();

        this.p5.setup = () => {
            this.boardSetup();
        };

        //Get First Active Board Information
        this.gameAPI.getObservableFirstActiveBoard().subscribe((success) => {
            var boardResponse: BoardResponse = success.body || this.getDefaultBoard();
            console.log("Board Response:", boardResponse);

            this.color = boardResponse.bg_color;
            this.width = boardResponse.width;
            this.height = boardResponse.height;
            this.id = boardResponse.id;

            //Players
            var test = interval(environment.apiInterval).pipe(takeWhile(() => true)).subscribe(
                () => {
                    this.gameAPI.getPlayersByBoardID(this.id).subscribe((success) => {
                        this.enemyPlayers = this.createPlayerObjects(success.body);
                    });
                }
            );

            //Player
            this.gameAPI.createPlayer(this.getDefaultPlayer()).subscribe((success) => {
                var playerCreated: PlayerResponse | null = success.body;
                if (playerCreated) {
                    this.currentPlayer = this.createPlayerObjects([playerCreated], true)[0];
                    console.log('CREATED NEW PLAYER', playerCreated);
                }
            }, (error) => {
                console.error(error);
            });

            this.updateP5methods();
        }, (error) => {
            this.gameAPI.handleError(error);
        });
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

    public setColor(color?: string) {
        if (!color) {
            return;
        }
        this.color = color;
    }
    public setWidth(width?: number) {
        if (!width) {
            return;
        }
        this.width = width;
    }
    public setHeight(height?: number) {
        if (!height) {
            return;
        }
        this.height = height;
    }

    public getPlayerCount() {
        var x = this.enemyPlayers.length;
        var y = this.currentPlayer ? 1 : 0

        return x + y;
    }
    public getEnemyPlayers(){
        return this.enemyPlayers;
    }

    private getDefaultPlayer(): CreatePlayerPayload {
        var player = {
            "color": "#f00",
            //"color": this.p5.random(["#a2d3aa", "#dda", "#ada", "#34d", "#aaa", "#09d", "#f00"]),
            "board": this.id,
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
            "id": Math.floor(this.p5.random(900, 1000)),
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

    private createPlayerObjects(playersJSON: Array<PlayerResponse> | null, currentPlayer?: boolean) {
        if (!playersJSON || playersJSON.length < 1) {
            return [];
        }
        var playersObjects: Array<Player> = [];
        playersJSON.forEach(player => {
            var shapePlayer: ShapePlayer = {
                type: <ShapeType>player.type,
                radius: player.radius,
                color: player.color,
                pos_x: player.pos_x,
                pos_y: player.pos_y,
            }
            let playerObject = new Player(player.id, shapePlayer, this.canvasAPI, this.gameAPI);
            if (playersJSON.length == 1 && currentPlayer) {
                playerObject.setAsCurrentPlayer();
            }
            playersObjects.push(playerObject);
        });
        return playersObjects;
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
        console.log("Enemy Players", this.enemyPlayers);
    }

    private boardSetup() {
        if(!this.p5){
            return;
        }
        
        let width = this.p5.windowWidth;
        let height = this.p5.windowHeight;

        this.p5.createCanvas(width, height);
        this.p5.fill(this.p5.color(this.lineColor));

        this.p5.line(0, 0, width, 0);
        this.p5.line(0, 0, 0, height);
        this.p5.line(width, 0, width, height);
        this.p5.line(0, height, width, height);

        console.log("Setup window height/width", width + "," + height);
    }

    private drawGrid() {
        let p = this.p5;
        p.fill(p.color("#eee"));
        let canvasWidth = this.width;
        let canvasHeight = this.height;

        let interval_x = canvasWidth / 10;
        let interval_y = canvasHeight / 10;

        for (let i = 0; i < (canvasWidth); i += interval_x) {
            p.line(i, 0, i, canvasHeight);
        }
        for (let i = 0; i < (canvasHeight); i += interval_y) {
            p.line(0, i, canvasWidth, i);
        }
    }
    private drawHungerBar() {
        let p = this.p5;
        p.rect(20, 20, 500, 75);
        p.fill(p.color("#f00"));
        p.rect(20, 20, 100, 75);
    }

    private updateP5methods() {
        var p = this.p5;

        p.draw = () => {
            //Reset Background
            p.background(p.color("#fff"));

            //Draw Hunger Bar
            this.drawHungerBar();

            //Update Player Position
            if (this.currentPlayer) {
                let velocity_x = p.mouseX - (p.width / 2);
                let velocity_y = p.mouseY - (p.height / 2);
                let velocity = this.p5.createVector(velocity_x, velocity_y);
                this.currentPlayer.updatePlayerPosition(this,velocity);

                //Draw current player
                var player_object = this.currentPlayer.getPlayerObject();

                var cp_pos_x = this.currentPlayer.getPosX();
                var cp_pos_y = this.currentPlayer.getPosY();

                if (player_object instanceof Circle) {
                    p.translate(p.width / 2, p.height / 2);
                    var newZoomScale = (64 / player_object.getRadius());
                    this.zoomScale = p.lerp(this.zoomScale, newZoomScale, 0.1)
                    p.scale(this.zoomScale);

                    if (cp_pos_x && cp_pos_y) {
                        p.translate(-cp_pos_x, -cp_pos_y);
                    }
                }
                else {
                    if (cp_pos_x && cp_pos_y) {
                        let translate_x = (p.width / 2) - cp_pos_x;
                        let translate_y = (p.height / 2) - cp_pos_y;
                        p.translate(translate_x, translate_y);
                    }
                }
                //Draw grid
                this.drawGrid();
                this.currentPlayer.draw();
            }


            //Draw enemies
            this.enemyPlayers.forEach(enemyPlayer => {
                enemyPlayer.draw();
            });

            if (this.currentPlayer) {

                //Kill any eaten enemy players
                for (let i = 0; i < this.enemyPlayers.length; i++) {
                    let enemyPlayer = this.enemyPlayers[i];
                    if (this.currentPlayer.eatsPlayer(enemyPlayer)) {
                        enemyPlayer.died();
                    }
                }
            }

            /*
            //Launch projectiles
            if (p.keyIsDown(32)) {
                let velocity_x = p.mouseX - (p.width / 2);
                let velocity_y = p.mouseY - (p.height / 2);
                let velocity = this.p5.createVector(velocity_x, velocity_y);

                this.currentPlayer.launchProjectile(velocity);
            }
            

            //Draw projectiles
            let projectiles = this.currentPlayer.getProjectiles();
            for (let i = 0; i < projectiles.length; i++) {
                let projectile = projectiles[i];
                if (projectile instanceof Circle) {
                    p.circle(projectile.getPosX(), projectile.getPosY(), (projectile.getRadius() * 2));
                }
            }
            */
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