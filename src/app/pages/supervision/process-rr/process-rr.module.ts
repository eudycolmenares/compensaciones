import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { ProcessRRRoutingModule } from './process-rr-routing.module';
import { ProcessRRComponent } from "./process-rr.component";
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [ProcessRRComponent],
  imports: [
    CommonModule,
    ProcessRRRoutingModule,
    ComponentsModule,
    // NgbDropdownModule
  ],
  exports: [ProcessRRComponent],
  bootstrap: [ProcessRRComponent],
})

export class ProcessRRModule { }
