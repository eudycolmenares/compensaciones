import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { OriginTypeRoutingModule } from './origin-type-routing.module';
import { OriginTypeComponent } from './origin-type.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [OriginTypeComponent],
  imports: [
    CommonModule,
    OriginTypeRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [OriginTypeComponent],
  bootstrap: [OriginTypeComponent],
  providers: [DecimalPipe]
})

export class OriginTypeModule { }
