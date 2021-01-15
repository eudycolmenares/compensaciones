import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadFaultsComponent } from './load-faults.component';

const ROUTES: Routes = [
  {
    path: '',
    component: LoadFaultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class LoadFaultsRoutingModule { }
