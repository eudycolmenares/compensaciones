import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StratumComponent } from './stratum.component';

const ROUTES: Routes = [
  {
    path: '',
    component: StratumComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class StratumRoutingModule { }
