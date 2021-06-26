import { ViewChild, ElementRef } from "@angular/core";
import { Player } from "./player";

export class Game {

    //@ViewChild("game") 
    private canvas!: ElementRef;
    private players: Array<Player> = [];
    private context: any;

    constructor(canvas: ElementRef) {
        this.canvas = canvas;
        this.players = [
            // new Player(20,20,5,5)
        ];
        this.redrawGame();
    }

    private redrawGame() {
        this.context = this.getContext();
        this.clearCanvas();

        this.players.forEach((player) => {
            this.context = this.getContext();
            this.drawPlayer(player);
        });
    }

    private getContext() {
        return this.canvas.nativeElement.getContext("2d");
    }
    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
    private drawPlayer(player: Player) {
        this.drawCirclePlayer(player);
    }

    public addPlayer(player: Player) {
        this.players.push(player);
        this.context = this.getContext();
        this.drawPlayer(player);
    }
    public updateCurrentPlayer(direction: string) {
        this.players.forEach((player, i) => {
            if (player.isCurrentPlayer()) {
                player.updatePlayer(direction);
            }
        });
        this.redrawGame();
    }
    public drawCirclePlayer(player:Player) {
        this.context = this.getContext();
        this.context.beginPath();
        this.context.arc(player.getPosX(), player.getPosY(), player.getWidth()/2, 0, 2 * Math.PI);
        this.context.fill();
    }
    public drawSquarePlayer(player:Player){
        this.context.fillRect(player.getPosX(), player.getPosY(), player.getWidth(), player.getHeight());
    }
}
