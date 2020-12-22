import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemStatusRoutingModule } from './system-status-routing.module';
import { SystemStatusComponent } from './system-status.component';
import { DashboardModule } from '../../dashboard/dashboard.module';


@NgModule({
  declarations: [SystemStatusComponent],
  imports: [
    CommonModule,
    SystemStatusRoutingModule,
    DashboardModule
  ]
})
export class SystemStatusModule { }
