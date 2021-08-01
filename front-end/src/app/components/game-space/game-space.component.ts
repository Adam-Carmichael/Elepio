import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/classes/game/game';
import { GameUpdatesService } from 'src/app/services/game-updates.service';

@Component({
  selector: 'app-game-space',
  templateUrl: './game-space.component.html',
  styleUrls: ['./game-space.component.scss']
})
export class GameSpaceComponent implements OnInit {
  public game!: Game;

  constructor(private gameAPI:GameUpdatesService) { }

  ngOnInit(): void {
    this.game = new Game(this.gameAPI);
  }
}
