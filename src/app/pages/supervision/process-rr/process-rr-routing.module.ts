import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessRRComponent } from "./process-rr.component";

const routes: Routes = [
  {
    path: '',
    component: ProcessRRComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProcessRRRoutingModule { }
