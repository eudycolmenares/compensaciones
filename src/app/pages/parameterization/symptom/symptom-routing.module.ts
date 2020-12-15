import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymptomComponent } from './symptom.component';

const ROUTES: Routes = [
  {
    path: '',
    component: SymptomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class SymptomRoutingModule { }
