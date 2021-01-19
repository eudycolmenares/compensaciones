import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RrFailureValidationComponent } from './rr-failure-validation.component';

const routes: Routes = [
  {
    path: '',
    component: RrFailureValidationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrFailureValidationRoutingModule { }
