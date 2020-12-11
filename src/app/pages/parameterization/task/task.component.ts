import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { SortableDirective, SortEvent } from '../../../directives/sortable.directive';
import { TaskModel } from '../../../models/task';
import { TaskService } from '../../../services/task.service';

// **********************************************

// rotate() {
//   this.direction = rotate[this.direction];
//   this.sort.emit({column: this.sortable, direction: this.direction});
// }


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  tasks: Observable<TaskModel[]>;
  total$: Observable<number>;
  // $
  time = {hour: 13, minute: 30};
  model: NgbDateStruct;

  constructor(
    public taskSvc: TaskService
  ) {
    this.tasks = this.taskSvc.taks$;
    this.total$ = this.taskSvc.total$;

    // borrar
    this.tasks.subscribe(result => {
      console.log('Result: ', result);
      console.log('taskSvc.page: ', this.taskSvc.page);

    })
  }

  ngOnInit(): void {
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    console.log('Llego aca????');
    // sorting countries
    this.taskSvc.sortColumn = column;
    this.taskSvc.sortDirection = direction;
  }

}
