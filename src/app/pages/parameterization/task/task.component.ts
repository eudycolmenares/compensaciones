import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { SortableDirective, SortEvent } from '../../../directives/sortable.directive';
import { TaskModel } from '../../../models/task';
import { TaskService } from '../../../services/task.service';

const TASKS: TaskModel[] = [
  {
    id: 1,
    period: 'Semanal',
    date: '2020/12/11',
    time: '20:22:00',
    status: 'Activo'
  },
  {
    id: 2,
    period: 'Diario',
    date: '2020/10/01',
    time: '08:30:00',
    status: 'Inactivo'
  },
  {
    id: 3,
    period: 'Diario',
    date: '2020/10/01',
    time: '08:30:00',
    status: 'Inactivo'
  },
  {
    id: 4,
    period: 'Semestral',
    date: '2021/02/05',
    time: '08:30:00',
    status: 'Activo'
  },
  {
    id: 5,
    period: 'Diario',
    date: '2020/10/01',
    time: '08:30:00',
    status: 'Inactivo'
  },
  {
    id: 6,
    period: 'Mensual',
    date: '2020/09/20',
    time: '16:30:00',
    status: 'Inactivo'
  },
  {
    id: 7,
    period: 'Anual',
    date: '2021/01/01',
    time: '01:00:00',
    status: 'Activo'
  },
];

// **********************************************

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

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
  tasks = TASKS;
  // tasks: Observable<TaskModel[]>;
  // $
  time = {hour: 13, minute: 30};
  model: NgbDateStruct;

  constructor(
    public taskSvc: TaskService
  ) {
    // this.tasks = this.taskSvc.countries$;
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
    // this.taskSvc.sortColumn = column;
    // this.taskSvc.sortDirection = direction;
  }

}
