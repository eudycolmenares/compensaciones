import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CausesComponent } from './causes.component';

const routes: Routes = [
  {
    path: '',
    component: CausesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CausesRoutingModule { }
