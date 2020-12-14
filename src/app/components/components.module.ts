import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [
    BreadcrumbComponent,
    ToastComponent
  ]
})

export class ComponentsModule { }
