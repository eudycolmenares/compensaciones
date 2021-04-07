import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailComponent } from './email.component';

const ROUTES: Routes = [
  {
    path: '',
    component: EmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class EmailRoutingModule { }
