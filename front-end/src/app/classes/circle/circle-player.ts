import { ShapePlayer, PlayerMethods, ShapeObject, ShapeType, WebSocketPlayerMessage } from "src/app/interfaces/interfaces";
import { CanvasService } from "src/app/services/canvas/canvas.service";
import { Circle } from "./circle";
import { Board } from "../board/board";
import config from "src/assets/config.json";
import p5 from "p5";

import { interval, Subscription } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { GameService } from "src/app/services/game/game.service";
import { environment } from "src/environments/environment";
import { CircleProjectile } from "./circle-projectile";
import { Queue } from "../queue/queue";

export class CirclePlayer extends Circle implements PlayerMethods {
    private currentPlayer: boolean = false;
    private alive: boolean = true;
    private id: string = "";

    private launchesProjectile = true;
    private projectiles: Queue<CircleProjectile>;
    private projectileSize: number = 10;
    private projectileColor: string = "black";

    constructor(circleObj: ShapeObject, canvasAPI: CanvasService, private gameAPI: GameService) {
        super(circleObj, canvasAPI);
        this.radius = circleObj.radius || 0;
        this.setVector(this.p5.createVector(circleObj.pos_x, circleObj.pos_y));
        this.zoomEffectDivider = this.radius;
        this.id = circleObj.id;


        this.projectiles = new Queue<CircleProjectile>();
    }

    getID() {
        return this.id;
    }
    isAlive() {
        return this.alive;
    }
    setAsDead() {
        console.log("PLAYER ATE, Alive:", this.alive, this.id)
        this.alive = false;
        console.log("PLAYER ATE, Alive:", this.alive, this.id)

        this.gameAPI.deletePlayer(this.id).subscribe(
            (success) => {
                console.log("Success deletion",success);
            },
            (error) =>{
                console.log("Failed Deletion", error)
            }
        );
    }
    isCurrentPlayer() {
        return this.currentPlayer;
    }
    setAsCurrentPlayer() {
        this.currentPlayer = true;
    }

    canLaunchProjectile() {
        return this.launchesProjectile;
    }

    /**
     * Draw if Player is alive and has an object associated to them
     * @returns 
     */
    draw() {
        if (!this.alive) {
            return;
        }

        super.draw();

        //Draw its related projectiles
        this.projectiles.forEach((projectile, i) => {
            if (!projectile.draw()) {
                this.projectiles.removeIndex(i);
            }
        });
    }
    updateData(data: ShapeObject) {
        this.radius = data.radius || 0;
        this.color = data.color;
        this.vector.x = data.pos_x;
        this.vector.y = data.pos_y;
    }
    getData(): WebSocketPlayerMessage {
        return {
            id: this.id,
            color: this.color,
            pos_x: this.getPosX(),
            pos_y: this.getPosY(),
            radius: this.radius
        }
    }

    /**
     * Updates Player's Position
     * @param board 
     * @param velocity 
     * @returns void
     */
    updatePosition() {
        if (!this.alive) {
            return;
        }

        var velocity_x = this.p5.mouseX - (this.p5.width / 2);
        var velocity_y = this.p5.mouseY - (this.p5.height / 2);
        var velocity = this.p5.createVector(velocity_x, velocity_y);

        velocity.setMag(config.playerMagnitude);

        var vector = this.getVector();
        var newVector = vector.add(velocity);

        //Update Player's position if within the board canvas
        if (this.inCanvas(newVector)) {
            this.setVector(newVector);
        }
        else {
            vector.sub(velocity);
        }


        //Update Projectile's positions
        this.projectiles.forEach((projectile) => {
            projectile.updatePosition();
        })
    }


    /**
     * Determines if a player is 
     * @param enemyPlayer 
     * @returns boolean
     */
    eatsPlayer(enemyPlayer: ShapePlayer) {
        if (!this.alive || !enemyPlayer.isAlive()) {
            return false;
        }

        var inEnemySpace = false;

        var currentPlayerRadius = this.getRadius();
        var enemyPlayerRadius = enemyPlayer.getRadius();

        var currentPlayerSA = Math.PI * Math.pow(currentPlayerRadius, 2);
        var enemyPlayerSA = Math.PI * Math.pow(enemyPlayerRadius, 2);

        //Current Player has to be bigger than the enemy player
        if (enemyPlayerSA >= currentPlayerSA) {
            return false;
        }

        var ep_pos_x = enemyPlayer.getPosX();
        var ep_pos_y = enemyPlayer.getPosY();

        var pos_x = this.getPosX();
        var pos_y = this.getPosY();

        if (ep_pos_x && ep_pos_y && pos_x && pos_y) {

            var xDelta = Math.pow((ep_pos_x - pos_x), 2);
            var yDelta = Math.pow((ep_pos_y - pos_y), 2);
            var distance = Math.sqrt(xDelta + yDelta);

            inEnemySpace = this.getRadius() >= distance;
            if (inEnemySpace) {
                this.incrementRadius(4);
            }
        }


        return inEnemySpace;
    }

    /**
     * Determines whether the current player overlaps another given player
     * @param enemyPlayer 
     * @returns 
     */
    overlapsPlayer(enemyPlayer: ShapePlayer) {
        if (!this.alive || !enemyPlayer.isAlive()) {
            return false;
        }

        var e_vector = enemyPlayer.getVector();
        if (e_vector) {
            var d = this.getVector().dist(e_vector);
            if (d < (this.getRadius() + enemyPlayer.getRadius())) {
                return true;
            }
        }

        return false;
    }

    launchProjectile() {
        var circleObj: ShapeObject = {
            id: "",
            type: "circle",
            radius: this.projectileSize,
            color: this.projectileColor,
            pos_x: this.getPosX(),
            pos_y: this.getPosY(),
        };

        var projectile = new CircleProjectile(circleObj, this.canvasAPI);
        projectile.getVector().setMag(config.projectileInitMag);

        this.projectiles.push(projectile);
    }




}
