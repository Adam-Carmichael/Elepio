export class Player {
    private x: number = 0;
    private y: number = 0;
    
    private width: number = 0;
    private height: number = 0;

    private radius: number = 5;
    
    private currentPlayer: boolean = false;

    constructor(x:number,y:number,width:number,height:number, currentPlayer?: boolean){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.currentPlayer = currentPlayer || false;
    }

    public updatePlayer(action: string) {
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
    public getPosX(){
        return this.x;
    }
    public getPosY(){
        return this.y;
    }
    public getWidth(){
        return this.width;
    }
    public getHeight(){
        return this.height;
    }
    public getRadius(){
        return this.radius;
    }
    public isCurrentPlayer(){
        return this.currentPlayer;
    }
    public setPosX(x:number){
        this.x = x;
    }
    public setPosY(y:number){
        this.y = y;
    }
    public setWidth(width:number){
        this.width = width;
    }
    public setPosHeight(height:number){
        this.height = height;
    }
    

    


}
