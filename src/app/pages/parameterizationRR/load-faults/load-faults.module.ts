import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { LoadFaultsRoutingModule } from './load-faults-routing.module';
import { LoadFaultsComponent } from './load-faults.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [LoadFaultsComponent],
  imports: [
    CommonModule,
    LoadFaultsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  exports: [LoadFaultsComponent],
  bootstrap: [LoadFaultsComponent],
})

export class LoadFaultsModule { }
