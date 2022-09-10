import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { CanvasTool_P5 } from 'src/app/classes/canvas-creator/canvas-tool';
import { Game } from 'src/app/classes/game/game';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-game-space',
  templateUrl: './game-space.component.html',
  styleUrls: ['./game-space.component.scss']
})

export class GameSpaceComponent implements OnInit {
  public game!: Game;
  public gameLoaded: boolean = false;

  constructor(private gameAPI: GameService, private canvasAPI: CanvasService) { }

  ngOnInit(): void {
    this.game = new Game(this.gameAPI, this.canvasAPI);

    let checks = interval(1000).subscribe((check)=>{
      this.gameLoaded = this.game.hasBoard();
      if(check == 10){
        checks.unsubscribe();
      }
    });

  }
  public createNewPlayer() {
    this.game.createNewPlayer();
  }
  public logCurrentPlayer(){
    console.log("CurrentPlayer Info:",this.game.getBoard()?.logCurrentPlayer());
  }
  public logAllPlayers(){
    this.game.logAllPlayers();
  }
  public killAllPlayers(){
    this.game.killAllPlayers();
  }
}
