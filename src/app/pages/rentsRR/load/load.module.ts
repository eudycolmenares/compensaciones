import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { LoadRoutingModule } from './load-routing.module';
import { LoadComponent } from './load.component';
import { ComponentsModule } from  '../../../components/components.module';

@NgModule({
  declarations: [LoadComponent],
  imports: [
    CommonModule,
    LoadRoutingModule,
    ComponentsModule
  ],
  exports: [LoadComponent],
  bootstrap: [LoadComponent],
  providers: [DecimalPipe]
})

export class LoadModule { }
