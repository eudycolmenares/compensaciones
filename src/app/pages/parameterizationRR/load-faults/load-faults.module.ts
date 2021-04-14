import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';

import { LoadFaultsRoutingModule } from './load-faults-routing.module';
import { LoadFaultsComponent } from './load-faults.component';
import { DashboardModule } from '../../dashboard/dashboard.module';

@NgModule({
  declarations: [LoadFaultsComponent],
  imports: [
    CommonModule,
    LoadFaultsRoutingModule,
    DashboardModule,
    ConfirmDialogModule,
    DropdownModule,
    PanelModule,
    MenuModule,
    TableModule,
    DividerModule
  ],
  exports: [LoadFaultsComponent],
  providers: [ConfirmationService],
})

export class LoadFaultsModule { }
