import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameSpaceComponent } from './components/game-space/game-space.component';

import { AddElepioAppComponent } from './components/add-elepio-app/add-elepio-app.component';
import { ElepioAppDetailsComponent } from './components/elepio-app-details/elepio-app-details.component';
import { ElepioAppListComponent } from './components/elepio-app-list/elepio-app-list.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GameSpaceComponent,
    AddElepioAppComponent,
    ElepioAppDetailsComponent,
    ElepioAppListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
