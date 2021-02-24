import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadComponent } from './download.component';
import { ComponentsModule } from  '../../../components/components.module';

@NgModule({
  declarations: [DownloadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DownloadRoutingModule,
    ComponentsModule,
  ],
  exports: [DownloadComponent],
  bootstrap: [DownloadComponent],
  providers: [DecimalPipe]
})

export class DownloadModule { }
