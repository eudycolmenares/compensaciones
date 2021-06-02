import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TableComponent } from './table/table.component';
import { SortableDirective } from '../directives/sortable.directive';
import { HourMinutePipe } from '../shared/pipes/hour-minute.pipe';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    TableComponent,
    SortableDirective,
    HourMinutePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    DropdownModule
  ],
  exports: [
    BreadcrumbComponent,
    TableComponent
  ],
  providers: [ConfirmationService]
})

export class ComponentsModule { }
