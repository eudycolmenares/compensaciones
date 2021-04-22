import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkLoadRoutingModule } from './bulk-load-routing.module';
import { BulkLoadComponent } from './bulk-load.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [BulkLoadComponent],
  imports: [
    CommonModule,
    BulkLoadRoutingModule,
    DashboardModule,
    ConfirmDialogModule,
    DropdownModule,
    PanelModule,
    MenuModule,
    TableModule,
    DividerModule
  ],
  exports: [BulkLoadComponent],
  providers: [ConfirmationService],
})
export class BulkLoadModule {}
