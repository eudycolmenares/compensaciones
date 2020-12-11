import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbPaginationModule  } from '@ng-bootstrap/ng-bootstrap';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SortableDirective } from '../../../directives/sortable.directive';
import { TaskService } from '../../../services/task.service';

@NgModule({
  declarations: [
    TaskComponent,
    SortableDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    TaskRoutingModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbPaginationModule
  ],
  exports: [TaskComponent],
  bootstrap: [TaskComponent],
  providers: [TaskService, DecimalPipe]
})

export class TaskModule { }
