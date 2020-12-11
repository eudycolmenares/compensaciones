import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { TaskModel, SearchResultModel } from '../models/task';
import { StatePagination } from '../models/general';
import { SortDirection } from '../directives/sortable.directive';
import { GeneralFunctionsService } from '../services/general-functions.service';

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

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  search$ = new Subject<void>();
  _tasks$ = new BehaviorSubject<TaskModel[]>([]);
  _total$ = new BehaviorSubject<number>(0);
  _state: StatePagination = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private pipe: DecimalPipe,
    private generalSvc: GeneralFunctionsService
  ) {
    this.search$.pipe(
      // tap(() => this._loading$.next(true)),
      // debounceTime(200),
      switchMap(() => this.search()),
      // delay(200),
      // tap(() => this._loading$.next(false))
    ).subscribe(result => {
      console.log('Resultado search service: ', result);

      this._tasks$.next(result.tasks);
      this._total$.next(result.total);
    });
    this.search$.next();
  }

  get taks$() { return this._tasks$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get page() { return this._state.page; }
  set page(page: number) { this._set({page}); }
  get pageSize() { return this._state.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  get searchTerm() { return this._state.searchTerm; }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<StatePagination>) {
    Object.assign(this._state, patch);
    this.search$.next();
  }

  private search(): Observable<SearchResultModel> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let tasks = this.generalSvc.sort(TASKS, sortColumn, sortDirection);

    // 2. filter
    tasks = tasks.filter(task => this.generalSvc.matches(task, searchTerm, this.pipe));
    const total = tasks.length;

    // 3. paginate
    tasks = tasks.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({tasks, total});
  }
}
