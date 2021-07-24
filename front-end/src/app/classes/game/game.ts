import { ViewChild, ElementRef } from "@angular/core";
import { Player } from "../player/player";
import * as p5 from "p5";
import * as boardInfo from "../../demo_data/board.json";
import { Direction } from "../../interfaces/common.interface";

export class Game {
    private p5: any;

    private width: string;
    private height: string;
    private players: Array<Player> = [];
    private context: any;
    private background_color: string;

    constructor() {
        //Make API call to populate board data - players and details
        let boardInfo = this.getBoardInfo();
        
        this.width = boardInfo.board.width;
        this.height = boardInfo.board.height;
        this.background_color = boardInfo.board.background_color;

        this.players = this.getPlayerObjects(boardInfo.players);

        this.createCanvas();

        //this.redrawGame();
    }

    private getBoardInfo(){
        return boardInfo;
    }

    private getPlayerObjects(players:Array<any>){
        var player_objects:Array<Player> = [];
        players.forEach( (player) => {
            let player_object = new Player(player);
            player_objects.push(player_object);
        });
        return player_objects;
    }  

    private createCanvas() {
        this.p5 = new p5(this.sketch);
    }

    //p = canvas?
    private sketch(p: any) {
        p.setup = () => {
            p.createCanvas(this.width,this.height);
        }

        p.draw = () => {
            p.background(this.background_color);
            p.fill(0);
            p.rect(p.width / 2, p.height / 2, 50, 50);
        }
    }

    

    











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
