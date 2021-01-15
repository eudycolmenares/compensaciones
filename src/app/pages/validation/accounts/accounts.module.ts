import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ComponentsModule,
  ],
  exports: [AccountsComponent],
  bootstrap: [AccountsComponent],
})

export class AccountsModule { }
