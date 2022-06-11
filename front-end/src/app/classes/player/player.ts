// import p5 from "p5";

// import { Shape } from "../shape/shape";
// import { Square } from "../square/square";
// import { Circle } from "../circle/circle";
// import { Triangle } from "../triangle/triangle";

// import { ShapePlayer, SquarePlayer, TrianglePlayer, CircleObject } from "src/app/interfaces/interfaces";

// import { CanvasService } from "src/app/services/canvas/canvas.service";

// import { interval, Subscription } from "rxjs";
// import { takeWhile } from "rxjs/operators";
// import { GameService } from "src/app/services/game/game.service";
// import { Board } from "../board/board";

// import { environment } from "src/environments/environment";

// export class Player {
//     private alive: boolean = true;
//     private player_object: Shape | null;
//     private bullet_size: number = 10;
//     private id: number;

//     private currentPlayer: boolean = false;
//     private projectiles: Array<Circle> = [];

//     private updateInterval: number = environment.apiInterval;

//     constructor(id: number, player: ShapePlayer, private canvasAPI: CanvasService, private gameAPI: GameService) {
//         this.player_object = this.createShapeObj(player);
//         this.id = id;
//     }
//     public getID() {
//         return this.id;
//     }
//     public setAsCurrentPlayer() {
//         this.currentPlayer = true;
//         console.log("Setting as current player");

//         var test = interval(this.updateInterval).pipe(takeWhile(() => true)).subscribe(
//             () => {
//                 if (this.player_object) {
//                     //console.log("PLAYER POSTIION",this.getPlayerObject()?.getVector());
//                     this.gameAPI.updatePlayerLocation(this.id, {
//                         pos_x: Math.floor(this.player_object.getPosX() || 0),
//                         pos_y: Math.floor(this.player_object.getPosY() || 0),
//                     })?.subscribe((response) => {
//                         //console.log("updated player response:",response);
//                         //console.log(this.player_object?.getPosX(),this.player_object?.getPosY());
//                         //console.log("updatedpLayerposition",response);
//                     });
//                 }
//             }
//         );
//     }

//     public getPlayerObject() {
//         return this.player_object;
//     }

//     public createShapeObj(playerObj: ShapePlayer) {
//         var shapeObj: Shape | null = null;
//         switch (playerObj.type) {
//             case "circle":
//                 shapeObj = new Circle(<CircleObject>playerObj, this.canvasAPI);
//                 break;
//             case "square":
//                 shapeObj = new Square(<SquarePlayer>playerObj, this.canvasAPI);
//                 break;
//             case "triangle":
//                 shapeObj = new Triangle(<TrianglePlayer>playerObj, this.canvasAPI);
//                 break;
//             default:
//                 console.error("Invalid Shape", playerObj.type);
//         }
//         return shapeObj;
//     }

//     public getVector() {
//         if (!this.player_object) {
//             return;
//         }
//         return this.player_object.getVector();
//     }

//     public getPosX() {
//         if (!this.player_object) {
//             return;
//         }
//         return this.player_object.getPosX();
//     }
//     public getPosY() {
//         if (!this.player_object) {
//             return;
//         }
//         return this.player_object.getPosY();
//     }

//     public getProjectiles() {
//         return this.projectiles;
//     }

//     public isAlive() {
//         return this.alive;
//     }

//     public died() {
//         this.alive = false;
//         console.log("DEAD PLAYER - Coordinates:", this.getVector())
//     }


//     public draw() {
//         //Draw if Player is alive and has an object associated to them
//         if (!this.alive || !this.player_object) {
//             console.log("PLAYER DOESNT EXIST OR IS DEAD");
//             return;
//         }

//         this.player_object.draw();
//         return;
//     }

//     public launchProjectile(velocity: p5.Vector) {
//         if (!this.alive || !this.player_object) {
//             return;
//         }

//         var pos_x = this.getPosX();
//         var pos_y = this.getPosY();

//         if (!pos_x || !pos_y) {
//             return;
//         }

//         var info: CircleObject = {
//             "type": "circle",
//             "color": "#aaa",
//             "pos_x": pos_x,
//             "pos_y": pos_y,
//             "radius": this.bullet_size
//         };

//         var projectile = new Circle(info, this.canvasAPI);
        
//     }

//     public updatePlayerPosition(board: Board, velocity: p5.Vector) {
//         if (!this.alive || !this.player_object) {
//             return;
//         }

//         velocity.setMag(3);
//         let vector = this.player_object.getVector();
//         var newVector = vector.add(velocity);

//         if (!this.withinBoard(board, newVector)) {
//             vector.sub(velocity);
//             this.player_object.setVector(vector);
//             return;
//         }

//         this.player_object.setVector(newVector);
//         return;
//     }

//     public withinBoard(board: Board, vector: p5.Vector) {
//         let inHorizontal = vector.x <= board.getWidth() && vector.x >= 0;
//         let inVertical = vector.y <= board.getHeight() && vector.y >= 0;
//         return inHorizontal && inVertical;
//     }

//     public eatsPlayer(enemyPlayer: Player) {
//         if (!this.alive || !enemyPlayer.isAlive()) {
//             return false;
//         }

//         var inEnemySpace = false;

//         var enemyPlayerObject = enemyPlayer.getPlayerObject();
//         if (this.player_object instanceof Circle && enemyPlayerObject instanceof Circle) {

//             var currentPlayerRadius = this.player_object.getRadius();
//             var enemyPlayerRadius = enemyPlayerObject.getRadius();

//             var currentPlayerSA = Math.PI * Math.pow(currentPlayerRadius, 2);
//             var enemyPlayerSA = Math.PI * Math.pow(enemyPlayerRadius, 2);

//             //Current Player has to be bigger than the enemy player
//             if (enemyPlayerSA >= currentPlayerSA) {
//                 return false;
//             }

//             var ep_pos_x = enemyPlayer.getPosX();
//             var ep_pos_y = enemyPlayer.getPosY();

//             var pos_x = this.getPosX();
//             var pos_y = this.getPosY();

//             if (ep_pos_x && ep_pos_y && pos_x && pos_y) {

//                 var xDelta = Math.pow((ep_pos_x - pos_x), 2);
//                 var yDelta = Math.pow((ep_pos_y - pos_y), 2);
//                 var distance = Math.sqrt(xDelta + yDelta);

//                 inEnemySpace = this.player_object.getRadius() >= distance;
//                 if (inEnemySpace) {
//                     this.player_object.incrementRadius(4);
//                 }
//             }
//         }

//         return inEnemySpace;
//     }

//     public intersectsPlayer(enemyPlayer: Player) {
//         if (!this.alive || !enemyPlayer.isAlive() || !this.player_object) {
//             return false;
//         }

//         var e_vector = enemyPlayer.getVector();
//         if (e_vector) {
//             var d = this.player_object.getVector().dist(e_vector);
//             if (this.player_object instanceof Circle &&
//                 enemyPlayer.player_object instanceof Circle &&
//                 d < (this.player_object.getRadius() + enemyPlayer.player_object.getRadius())
//             ) {
//                 return true;
//             }
//         }

//         return false;
//     }

// }









/*

 if (this.currentPlayer) {
                let velocity_x = p.mouseX - (p.width / 2);
                let velocity_y = p.mouseY - (p.height / 2);
                let velocity = this.p5.createVector(velocity_x, velocity_y);
                this.currentPlayer.updatePosition(this, velocity);

                var cp_pos_x = this.currentPlayer.getPosX();
                var cp_pos_y = this.currentPlayer.getPosY();

                if (this.currentPlayer) {
                    p.translate(p.width / 2, p.height / 2);
                    var newZoomScale = (64 / this.currentPlayer.getRadius());
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
                //Draw Player
                this.currentPlayer.draw();
            }

*/