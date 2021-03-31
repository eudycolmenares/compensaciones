import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
    ConfirmDialogModule,
    // NgbDropdownModule
  ],
  exports: [ProcessRRComponent],
  bootstrap: [ProcessRRComponent],
})

export class ProcessRRModule { }
