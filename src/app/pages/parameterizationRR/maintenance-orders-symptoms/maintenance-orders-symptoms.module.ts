import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MultiSelectModule } from 'primeng/multiselect';

import { MaintenanceOrdersSymptomsRoutingModule } from './maintenance-orders-symptoms-routing.module';
import { MaintenanceOrdersSymptomsComponent } from './maintenance-orders-symptoms.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MaintenanceOrdersSymptomsComponent],
  imports: [
    CommonModule,
    MaintenanceOrdersSymptomsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MultiSelectModule
  ],
  exports: [MaintenanceOrdersSymptomsComponent],
  bootstrap: [MaintenanceOrdersSymptomsComponent],
  providers: [DecimalPipe]
})

export class MaintenanceOrdersSymptomsModule { }
