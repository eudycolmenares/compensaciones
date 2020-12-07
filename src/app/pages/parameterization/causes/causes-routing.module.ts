import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CausesComponent } from './causes.component';

const ROUTES: Routes = [
  {
    path: '',
    component: CausesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class CausesRoutingModule { }
