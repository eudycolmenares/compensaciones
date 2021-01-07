import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CausesRoutingModule } from './causes-routing.module';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { CausesComponent } from './causes.component';


@NgModule({
  declarations: [CausesComponent],
  imports: [
    CommonModule,
    CausesRoutingModule,
    DashboardModule
  ]
})
export class CausesModule { }
