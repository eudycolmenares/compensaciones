import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { CalendarModule } from 'primeng/calendar';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  exports: [AccountsComponent],
  bootstrap: [AccountsComponent],
})

export class AccountsModule { }
