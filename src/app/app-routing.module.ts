import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoworkingdashboardComponent } from './coworkingdashboard/coworkingdashboard.component';
import { CoworkformComponent } from './coworkform/coworkform.component';

const routes: Routes = [
  { path: '', component: CoworkingdashboardComponent },
  { path: 'cowork', component: CoworkingdashboardComponent },
  { path: 'coworkform', component: CoworkformComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
