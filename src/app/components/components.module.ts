import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule  } from '@ng-bootstrap/ng-bootstrap';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ToastComponent } from './toast/toast.component';
import { TableComponent } from './table/table.component';
import { SortableDirective } from '../directives/sortable.directive';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ToastComponent,
    TableComponent,
    SortableDirective
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    FormsModule,
    NgbPaginationModule
  ],
  exports: [
    BreadcrumbComponent,
    ToastComponent,
    TableComponent
  ]
})

export class ComponentsModule { }
