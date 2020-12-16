import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    ReactiveFormsModule
  ],
  exports: [OriginTypeComponent],
})

export class OriginTypeModule { }
