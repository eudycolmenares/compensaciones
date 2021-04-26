import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ObservationComponent } from './observation.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ObservationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class ObservationRoutingModule { }
