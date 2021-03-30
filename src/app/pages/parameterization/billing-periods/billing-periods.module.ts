import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingPeriodsRoutingModule } from './billing-periods-routing.module';
import { BillingPeriodsComponent } from './billing-periods.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [BillingPeriodsComponent],
  imports: [
    CommonModule,
    BillingPeriodsRoutingModule,
    DashboardModule,
    CalendarModule
  ]
})
export class BillingPeriodsModule { }
