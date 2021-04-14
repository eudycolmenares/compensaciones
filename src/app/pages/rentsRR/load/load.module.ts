import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';

import { LoadRoutingModule } from './load-routing.module';
import { LoadComponent } from './load.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [LoadComponent],
  imports: [
    CommonModule,
    LoadRoutingModule,
    DashboardModule,
    ConfirmDialogModule,
    ConfirmDialogModule,
    DropdownModule,
    PanelModule,
    MenuModule,
    TableModule,
    DividerModule
  ],
  exports: [LoadComponent],
  providers: [ConfirmationService],
})

export class LoadModule { }
