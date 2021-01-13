import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceOrdersCausesRoutingModule } from './maintenance-orders-causes-routing.module';
import { MaintenanceOrdersCausesComponent } from './maintenance-orders-causes.component';
import { DashboardModule } from '../../dashboard/dashboard.module';


@NgModule({
  declarations: [MaintenanceOrdersCausesComponent],
  imports: [
    CommonModule,
    MaintenanceOrdersCausesRoutingModule,
    DashboardModule
  ]
})
export class MaintenanceOrdersCausesModule { }
