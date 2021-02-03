import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TableComponent } from './table/table.component';
import { SortableDirective } from '../directives/sortable.directive';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    TableComponent,
    SortableDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  exports: [
    BreadcrumbComponent,
    TableComponent
  ],
  providers: [ConfirmationService]
})

export class ComponentsModule { }
