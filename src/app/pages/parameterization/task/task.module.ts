import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    TaskRoutingModule,
    NgbDatepickerModule,
    NgbTimepickerModule
  ],
  exports: [TaskComponent],
})

export class TaskModule { }
