import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OriginTypeComponent } from './origin-type.component';

const ROUTES: Routes = [
  {
    path: '',
    component: OriginTypeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class OriginTypeRoutingModule { }
