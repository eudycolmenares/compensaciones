import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodesRoutingModule } from './nodes-routing.module';
import { NodesComponent } from './nodes.component';
import { DashboardModule } from '../../dashboard/dashboard.module';


@NgModule({
  declarations: [NodesComponent],
  imports: [
    CommonModule,
    NodesRoutingModule,
    DashboardModule
  ]
})
export class NodesModule { }
