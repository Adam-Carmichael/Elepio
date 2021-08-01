import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameSpaceComponent } from './components/game-space/game-space.component';
import { GameUpdatesService } from './services/game-updates.service';

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
  providers: [GameUpdatesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
