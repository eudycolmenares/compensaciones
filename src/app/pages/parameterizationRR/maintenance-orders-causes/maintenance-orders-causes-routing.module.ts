import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceOrdersCausesComponent } from './maintenance-orders-causes.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceOrdersCausesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceOrdersCausesRoutingModule { }
