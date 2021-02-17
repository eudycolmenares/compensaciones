import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RrFailureValidationRoutingModule } from './rr-failure-validation-routing.module';
import { RrFailureValidationComponent } from './rr-failure-validation.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [RrFailureValidationComponent],
  imports: [
    CommonModule,
    RrFailureValidationRoutingModule,
    DashboardModule,
    MultiSelectModule
  ]
})
export class RrFailureValidationModule { }
