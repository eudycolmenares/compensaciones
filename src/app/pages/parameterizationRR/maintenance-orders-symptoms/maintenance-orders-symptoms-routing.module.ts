import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceOrdersSymptomsComponent } from './maintenance-orders-symptoms.component';

const ROUTES: Routes = [
  {
    path: '',
    component: MaintenanceOrdersSymptomsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class MaintenanceOrdersSymptomsRoutingModule { }
