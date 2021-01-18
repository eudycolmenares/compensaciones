import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadComponent } from './load.component';

const ROUTES: Routes = [
  {
    path: '',
    component: LoadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LoadRoutingModule { }
