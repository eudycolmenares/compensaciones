import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingPeriodsComponent } from './billing-periods.component';

const routes: Routes = [
  {
    path: '',
    component: BillingPeriodsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingPeriodsRoutingModule { }
