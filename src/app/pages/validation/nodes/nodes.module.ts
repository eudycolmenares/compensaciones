import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodesRoutingModule } from './nodes-routing.module';
import { NodesComponent } from './nodes.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [NodesComponent],
  imports: [
    CommonModule,
    NodesRoutingModule,
    DashboardModule,
    DropdownModule
  ]
})
export class NodesModule { }
