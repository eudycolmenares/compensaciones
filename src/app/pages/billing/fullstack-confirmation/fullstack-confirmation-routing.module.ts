import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullstackConfirmationComponent } from './fullstack-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: FullstackConfirmationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullstackConfirmationRoutingModule { }
