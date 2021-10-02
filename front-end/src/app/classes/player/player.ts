import p5 from "p5";

import { Shape } from "../shape/shape";
import { Square } from "../square/square";
import { Circle } from "../circle/circle";
import { Triangle } from "../triangle/triangle";

import { Direction, ILocation, IShape, ICircle, ISquare, ITriangle, IPlayer } from "src/app/interfaces/interfaces";

import { CanvasService } from "src/app/services/canvas/canvas.service";

export class Player {
    private alive:boolean = true;
    private p5: p5;
    private pos: p5.Vector;
    private player_object: Shape;

    private currentPlayer: boolean = false;

    constructor(player: IPlayer, private canvasAPI: CanvasService) {
        this.p5 = canvasAPI.getP5();
        this.pos = this.p5.createVector(player.player_object.pos_x, player.player_object.pos_y);
        this.player_object = this.createShapeObj(player.player_object);
    }

    public getPlayerObject(){
        return this.player_object;
    }

    public createShapeObj(playerObj: IShape) {
        var shapeObj: Shape;
        switch (playerObj.type) {
            case "circle":
                shapeObj = new Circle(<ICircle>playerObj);
                break;
            case "square":
                shapeObj = new Square(<ISquare>playerObj);
                break;
            case "triangle":
                shapeObj = new Triangle(<ITriangle>playerObj);
                break;
            default:
                shapeObj = new Circle(<ICircle>playerObj);
                console.error("Invalid Shape", playerObj.type);
        }
        return shapeObj;
    }

    public getVector() {
        return this.pos;
    }

    public getPosX() {
        return this.pos.x;
    }
    public getPosY() {
        return this.pos.y;
    }

    public isAlive(){
        return this.alive;
    }
    
    public died(){
        this.alive = false;
    }

    public draw() {
        if(!this.alive){
            return;
        }

        this.p5.fill(this.p5.color(this.player_object.getColor()));
        if (this.player_object instanceof Square) {
            this.p5.square(this.pos.x, this.pos.y, this.player_object.getWidth());
        }
        else if (this.player_object instanceof Circle) {
            this.p5.circle(this.pos.x, this.pos.y, (this.player_object.getRadius() * 2));
            this.p5.fill(this.p5.color(255, 0, 0));
            this.p5.circle(this.pos.x, this.pos.y, 1);
        }
        else if (this.player_object instanceof Triangle) {
            //p.triangle(x1, y1, x2, y2, x3, y3);
            console.error("Triangle Object Not Yet Supported");
        }
        return;
    }

    public updatePlayer(action: Direction) {
        switch (action) {
            case Direction.up:
                this.pos.y = this.pos.y - 20;
                break;
            case Direction.down:
                this.pos.y = this.pos.y + 20;
                break;
            case Direction.right:
                this.pos.x = this.pos.x + 20;
                break;
            case Direction.left:
                this.pos.x = this.pos.x - 20;
                break;
            default:
        }
    }

    public updatePlayerPosition(velocity: p5.Vector) {
        if(!this.alive){
            return;
        }

        velocity.setMag(3);
        this.pos.add(velocity);
    }

    public eatsPlayer(enemyPlayer: Player){
        if(!this.alive || !enemyPlayer.isAlive()){
            return false;
        }

        var enemyPlayerObject = enemyPlayer.getPlayerObject();
        if(this.player_object instanceof Circle && 
            enemyPlayerObject instanceof Circle){
            var currentPlayerRadius = this.player_object.getRadius();
            var enemyPlayerRadius = enemyPlayerObject.getRadius();
            
            var currentPlayerSA = Math.PI * (currentPlayerRadius^2);
            var enemyPlayerSA = Math.PI * (enemyPlayerRadius^2);

            if(enemyPlayerSA){
            
            }
            if(currentPlayerSA){
            
            }
        }

        var currentPlayerSA = 3;

        return true;
    }

    public intersectsPlayer(enemyPlayer: Player) {
        if(!this.alive || !enemyPlayer.isAlive()){
            return false;
        }

        var d = this.pos.dist(enemyPlayer.getVector());
        if (this.player_object instanceof Circle &&
            enemyPlayer.player_object instanceof Circle &&
            d < (this.player_object.getRadius() + enemyPlayer.player_object.getRadius())
        ) {
            return true;
        }
        return false;
    }

}
