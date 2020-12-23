import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule  } from '@ng-bootstrap/ng-bootstrap';

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
    NgbPaginationModule
  ],
  exports: [
    BreadcrumbComponent,
    TableComponent
  ]
})

export class ComponentsModule { }
