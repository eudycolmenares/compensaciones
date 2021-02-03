import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CausesRoutingModule } from './causes-routing.module';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { CausesComponent } from './causes.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [CausesComponent],
  imports: [
    CommonModule,
    CausesRoutingModule,
    DashboardModule,
    MultiSelectModule,
  ],
})
export class CausesModule {}
