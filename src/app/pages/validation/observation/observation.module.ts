import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { ObservationRoutingModule } from './observation-routing.module';
import { ObservationComponent } from './observation.component';
import { ComponentsModule } from '../../../components/components.module';


@NgModule({
  declarations: [
    ObservationComponent
  ],
  imports: [
    CommonModule,
    ObservationRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ObservationModule { }
