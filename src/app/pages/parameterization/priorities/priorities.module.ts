import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrioritiesRoutingModule } from './priorities-routing.module';
import { PrioritiesComponent } from './priorities.component';
import { DashboardModule } from '../../dashboard/dashboard.module';


@NgModule({
  declarations: [PrioritiesComponent],
  imports: [
    CommonModule,
    PrioritiesRoutingModule,
    DashboardModule
  ]
})
export class PrioritiesModule { }
