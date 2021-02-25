import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RrCompensatedAccountsRoutingModule } from './rr-compensated-accounts-routing.module';
import { RrCompensatedAccountsComponent } from './rr-compensated-accounts.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [RrCompensatedAccountsComponent],
  imports: [
    CommonModule,
    RrCompensatedAccountsRoutingModule,
    DashboardModule,
    DropdownModule,
    CalendarModule,
  ]
})
export class RrCompensatedAccountsModule { }
