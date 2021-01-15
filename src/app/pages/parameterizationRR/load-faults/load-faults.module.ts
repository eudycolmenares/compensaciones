import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { LoadFaultsRoutingModule } from './load-faults-routing.module';
import { LoadFaultsComponent } from './load-faults.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [LoadFaultsComponent],
  imports: [
    CommonModule,
    LoadFaultsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [LoadFaultsComponent],
  bootstrap: [LoadFaultsComponent],
})

export class LoadFaultsModule { }
