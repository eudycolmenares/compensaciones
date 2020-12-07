import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustesComponent } from './ajustes.component';

const ROUTES: Routes = [
  {
    path: '',
    component: AjustesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class AjustesRoutingModule { }
