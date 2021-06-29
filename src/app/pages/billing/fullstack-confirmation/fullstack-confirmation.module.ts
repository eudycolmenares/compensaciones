import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullstackConfirmationRoutingModule } from './fullstack-confirmation-routing.module';
import { FullstackConfirmationComponent } from './fullstack-confirmation.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [FullstackConfirmationComponent],
  imports: [
    CommonModule,
    FullstackConfirmationRoutingModule,
    DashboardModule,
    CalendarModule
  ]
})
export class FullstackConfirmationModule { }
