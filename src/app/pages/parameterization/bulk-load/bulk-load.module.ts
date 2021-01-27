import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkLoadRoutingModule } from './bulk-load-routing.module';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { BulkLoadComponent } from './bulk-load.component';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BulkLoadComponent],
  imports: [
    CommonModule,
    BulkLoadRoutingModule,
    DashboardModule,
    NgbDropdownModule,
  ],
})
export class BulkLoadModule {}
