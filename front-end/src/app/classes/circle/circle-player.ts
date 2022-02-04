import { CircleObject, PlayerMethods, Player } from "src/app/interfaces/interfaces";
import { CanvasService } from "src/app/services/canvas/canvas.service";
import { Circle } from "./circle";
import { Board } from "../board/board";

import p5 from "p5";

import { interval, Subscription } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { GameService } from "src/app/services/game/game.service";
import { environment } from "src/environments/environment";

export class CirclePlayer extends Circle implements PlayerMethods {
    private currentPlayer: boolean = false;
    private alive: boolean = false;
    private id: number = 0;
    
    constructor(circleObj: CircleObject, canvasAPI: CanvasService) {
        super(circleObj, canvasAPI);
        this.radius = circleObj.radius;
        this.setVector(this.p5.createVector(circleObj.pos_x, circleObj.pos_y));
    }

    getID() {
        return this.id;
    }
    isAlive() {
        return this.alive;
    }
    setAsDead() {
        this.alive = false;
    }
    setAsCurrentPlayer() {
        this.currentPlayer = true;
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
        return;
    }

    /**
     * Updates Player's Position
     * @param board 
     * @param velocity 
     * @returns void
     */
    updatePosition(board: Board, velocity: p5.Vector) {
        if (!this.alive) {
            return;
        }

        velocity.setMag(3);
        let vector = this.getVector();
        var newVector = vector.add(velocity);

        if (!this.withinBoard(board, newVector)) {
            vector.sub(velocity);
            this.setVector(vector);
            return;
        }

        this.setVector(newVector);
        return;
    }

    /**
     * Checks if a given vector is located within a given board
     * @param board 
     * @param vector 
     * @returns boolean
     */
    withinBoard(board: Board, vector: p5.Vector) {
        let inHorizontal = vector.x <= board.getWidth() && vector.x >= 0;
        let inVertical = vector.y <= board.getHeight() && vector.y >= 0;
        return inHorizontal && inVertical;
    }

    /**
     * Determines if a player is 
     * @param enemyPlayer 
     * @returns boolean
     */
    eatsPlayer(enemyPlayer: Player) {
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
    overlapsPlayer(enemyPlayer: Player){
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
}
