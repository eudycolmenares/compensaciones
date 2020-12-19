import { Component, OnInit, Input, Output, PipeTransform, QueryList, ViewChildren, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

import { StatePagination } from '../../models/general';
import { SortableDirective, SortEvent, SortDirection } from '../../directives/sortable.directive';

interface SearchResultModel {
  data: any[];
  total: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;
  @Input() dataBase: object[];
  @Input() structure: object[];
  @Output() editRecord: EventEmitter<object> ;
  dataTable$ = new BehaviorSubject<object[]>([]);
  total$ = new BehaviorSubject<number>(0);
  search$ = new Subject<void>();
  _state: StatePagination = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private pipe: DecimalPipe,
  ) {
    this.editRecord = new EventEmitter()
  }

  ngOnInit(): void { }

  ngOnChanges(changes: object) {
    if(Object.keys(changes).length === 1) {
      this.callObservableSearch();
    }
  }

  sendDataToEdit(item) {
    console.log('sendDataToEdit()', item);
    this.editRecord.emit(item);
  }

  callObservableSearch() {
    this.search$.pipe(
      switchMap(() => this.search()),
    ).subscribe(result => {
      this.dataTable$.next(result.data);
      this.total$.next(result.total);
    });
    this.search$.next();
  }

  get pageSize() { return this._state.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  get page() { return this._state.page; }
  set page(page: number) { this._set({page}); }
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
    let data = this.sort(this.dataBase, sortColumn, sortDirection);
    // 2. filter
    data = data.filter(origin => this.matches(origin, searchTerm, this.pipe));
    const total = data.length;
    // 3. paginate
    data = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({data, total});
  }

  sort(data: any[], column: string, direction: string): any[] {
    if (direction === '') {
      return data;
    } else {
      return [...data].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  matches(data: object, term: string, pipe: PipeTransform) {
    return( Object.keys(data).find(opc => opc != 'id' && data[opc].toLowerCase().includes(term)) );
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    // sorting data
    this.sortColumn = column;
    this.sortDirection = direction;
  }
}
