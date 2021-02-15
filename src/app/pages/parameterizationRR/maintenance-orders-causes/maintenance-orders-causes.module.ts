import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceOrdersCausesRoutingModule } from './maintenance-orders-causes-routing.module';
import { MaintenanceOrdersCausesComponent } from './maintenance-orders-causes.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [MaintenanceOrdersCausesComponent],
  imports: [
    CommonModule,
    MaintenanceOrdersCausesRoutingModule,
    DashboardModule,
    MultiSelectModule
  ]
})
export class MaintenanceOrdersCausesModule { }
