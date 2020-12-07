import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CausasRoutingModule } from './causas-routing.module';
import { CausasComponent } from './causas.component';

@NgModule({
  declarations: [CausasComponent],
  imports: [
    CommonModule,
    CausasRoutingModule
  ],
  exports: [CausasComponent],
})
export class CausasModule { }
