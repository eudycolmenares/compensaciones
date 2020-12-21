import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { StratumRoutingModule } from './stratum-routing.module';
import { StratumComponent } from './stratum.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [StratumComponent],
  imports: [
    CommonModule,
    StratumRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [StratumComponent],
  bootstrap: [StratumComponent],
  providers: [DecimalPipe]
})

export class StratumModule { }
