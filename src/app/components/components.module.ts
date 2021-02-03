import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { NgbPaginationModule  } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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
    // NgbPaginationModule
    TableModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    BreadcrumbComponent,
    TableComponent
  ]
})

export class ComponentsModule { }
