import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { SymptomRoutingModule } from './symptom-routing.module';
import { SymptomComponent } from './symptom.component';
import { ComponentsModule } from  '../../../components/components.module';

@NgModule({
  declarations: [SymptomComponent],
  imports: [
    CommonModule,
    SymptomRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [SymptomComponent],
  bootstrap: [SymptomComponent],
  providers: [DecimalPipe]
})

export class SymptomModule { }
