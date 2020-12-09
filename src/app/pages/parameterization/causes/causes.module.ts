import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CausesRoutingModule } from './causes-routing.module';
import { CausesComponent } from './causes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CausesComponent],
  imports: [
    CommonModule,
    CausesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CausesComponent,ReactiveFormsModule],
})
export class CausesModule { }
