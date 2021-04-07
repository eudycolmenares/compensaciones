import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../../../../components/components.module';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';


@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    ComponentsModule
  ],
  exports: [EmailComponent],
  bootstrap: [EmailComponent],
})

export class EmailModule { }
