import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElepioAppListComponent } from './components/elepio-app-list/elepio-app-list.component'
import { ElepioAppDetailsComponent } from './components/elepio-app-details/elepio-app-details.component'
import { AddElepioAppComponent } from './components/add-elepio-app/add-elepio-app.component';

const routes: Routes = [
  { path: '', redirectTo: 'elepioApp', pathMatch: 'full'},
  { path: 'elepioApp', component: ElepioAppListComponent},
  { path: 'elepioApp/:id', component: ElepioAppDetailsComponent},
  { path: 'add', component: AddElepioAppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
