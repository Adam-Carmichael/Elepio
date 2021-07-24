import { Direction, ShapeType } from "../../interfaces/common.interface";
import * as PlayerInterface from "../../interfaces/player.interface";
import { Shape } from "../shape/shape";
import { Square } from "../square/square";

export class Player {
    public x: number = 0;
    public y: number = 0;

    public player_object: Square;

    private currentPlayer: boolean = false;

    constructor(player: PlayerInterface.Player) {
        this.x = player.player_location.pos_x;
        this.y = player.player_location.pos_y;

        let player_type = player.player_object.type;
        
        
        
        this.player_object = new Square(
            "red",
            player.player_object.width,
            player.player_object.height
        );


        // this.width = width;
        // this.height = height;
        //this.
        //this.currentPlayer = currentPlayer || false;
    }








    public updatePlayer(action: Direction) {
        switch (action) {
            case "up":
                this.y = this.y - 20;
                break;
            case "down":
                this.y = this.y + 20;
                break;
            case "right":
                this.x = this.x + 20;
                break;
            case "left":
                this.x = this.x - 20;
                break;
            default:
        }
    }

}
