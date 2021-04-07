import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../../../../components/components.module';
import { TableModule } from 'primeng/table';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';


@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    ComponentsModule,
    TableModule
  ],
  exports: [EmailComponent],
  bootstrap: [EmailComponent],
})

export class EmailModule { }
