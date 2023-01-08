import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoworkingdashboardComponent } from './coworkingdashboard/coworkingdashboard.component';
import { CoworkformComponent } from './coworkform/coworkform.component';
import { BuildingViewComponent } from './building-view/building-view.component';

const routes: Routes = [
  { path: '', component: CoworkformComponent },
  { path: 'cowork', component: CoworkingdashboardComponent },
  { path: 'coworkform', component: CoworkformComponent },
  { path: 'building-view', component: BuildingViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
