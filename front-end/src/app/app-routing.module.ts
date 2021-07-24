import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameSpaceComponent } from './components/game-space/game-space.component';

const routes: Routes = [
  {path:"",component:GameSpaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
