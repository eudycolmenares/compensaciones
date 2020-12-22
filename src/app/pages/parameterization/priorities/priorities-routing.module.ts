import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrioritiesComponent } from './priorities.component';

const routes: Routes = [
  {
    path: '',
    component: PrioritiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrioritiesRoutingModule { }
