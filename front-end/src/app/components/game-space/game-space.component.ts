import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/classes/game/game';

import * as p5 from "p5";

@Component({
  selector: 'app-game-space',
  templateUrl: './game-space.component.html',
  styleUrls: ['./game-space.component.scss']
})
export class GameSpaceComponent implements OnInit {
  public game!: Game;

  constructor() { }

  ngOnInit(): void {
    this.game = new Game();
  }
}
