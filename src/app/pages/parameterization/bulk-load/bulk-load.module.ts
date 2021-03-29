import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkLoadRoutingModule } from './bulk-load-routing.module';
import { BulkLoadComponent } from './bulk-load.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [BulkLoadComponent],
  imports: [
    CommonModule,
    BulkLoadRoutingModule,
    DashboardModule,
    ConfirmDialogModule,
    DropdownModule,
  ],
  providers: [ConfirmationService],
})
export class BulkLoadModule {}
