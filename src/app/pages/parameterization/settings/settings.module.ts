import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ComponentsModule } from '../../../components/components.module';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    MultiSelectModule
  ],
  exports: [SettingsComponent],
  bootstrap: [SettingsComponent],
  providers: [DecimalPipe]
})

export class SettingsModule { }
