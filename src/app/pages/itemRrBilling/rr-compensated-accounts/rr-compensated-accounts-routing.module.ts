import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RrCompensatedAccountsComponent } from './rr-compensated-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: RrCompensatedAccountsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrCompensatedAccountsRoutingModule { }
