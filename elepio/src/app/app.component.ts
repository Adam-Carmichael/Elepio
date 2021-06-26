import { 
  Component, 
  OnInit, 
  ViewChild, 
  ElementRef, 
  AfterViewInit, 
  HostListener 
} from '@angular/core';
import{ Player } from "./player";
import { Game } from './game';

//Evolve - 1 path - killing +1 spells
//firebackk - left
//wall - right
//body - circle
//farming - bumping/fireball
//ui - minimap + main content
//controls - wasd
//


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'elepio';
  
  public game!: Game;

  @ViewChild("game")
  gameCanvas!: ElementRef;

  public ngOnInit() {

  }

  public ngAfterViewInit() {
    //Create game after html has loaded
    this.game = new Game(this.gameCanvas);

    //Create main/current player
    var currentPlayer = new Player(20,20,5,5,true);
    this.game.addPlayer(currentPlayer);
  }

  public updateCurrentPlayer(direction:string){
    this.game.updateCurrentPlayer(direction);
  }


  




}
