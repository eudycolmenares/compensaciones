import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadFaultsRoutingModule } from './load-faults-routing.module';
import { LoadFaultsComponent } from './load-faults.component';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [LoadFaultsComponent],
  imports: [
    CommonModule,
    LoadFaultsRoutingModule,
    DashboardModule,
    ConfirmDialogModule,
    DropdownModule
  ],
  exports: [LoadFaultsComponent],
  providers: [ConfirmationService],
})

export class LoadFaultsModule { }
