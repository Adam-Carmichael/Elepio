import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameSpaceComponent } from './components/game-space/game-space.component';
import { GameService } from './services/game/game.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    GameSpaceComponent
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
