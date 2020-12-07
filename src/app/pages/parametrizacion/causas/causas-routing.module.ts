import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CausasComponent } from './causas.component';

const ROUTES: Routes = [
  {
    path: '',
    component: CausasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class CausasRoutingModule { }
