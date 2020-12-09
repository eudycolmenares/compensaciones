import {Injectable, PipeTransform} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { TaskModel } from '../models/task';
import { SortDirection } from '../directives/sortable.directive';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor() { }
}
