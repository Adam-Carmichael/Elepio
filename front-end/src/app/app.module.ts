import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameSpaceComponent } from './components/game-space/game-space.component';
import { GameService } from './services/game/game.service';

import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './services/app-config/app-config.service';

export function initializeApp(appConfig:AppConfigService){
  return () => appConfig.load();
}

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
  providers: [/*
    AppConfigService, 
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true
    },*/
    GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
