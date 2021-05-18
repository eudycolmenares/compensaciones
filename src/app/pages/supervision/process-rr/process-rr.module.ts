import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StepsModule } from 'primeng/steps';
import { SkeletonModule } from 'primeng/skeleton';

import { ProcessRRRoutingModule } from './process-rr-routing.module';
import { ProcessRRComponent } from "./process-rr.component";
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [ProcessRRComponent],
  imports: [
    CommonModule,
    ProcessRRRoutingModule,
    ComponentsModule,
    ConfirmDialogModule,
    StepsModule,
    SkeletonModule
  ],
  exports: [ProcessRRComponent],
  bootstrap: [ProcessRRComponent],
})

export class ProcessRRModule { }
