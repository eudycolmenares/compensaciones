import { Component, OnInit, Input, Output, PipeTransform, QueryList, ViewChildren, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StatePagination } from '../../models/general';
import { SortableDirective, SortEvent, SortDirection } from '../../directives/sortable.directive';
import { ButtonsTable as Buttons } from '../../libraries/utilities.library';

// modal

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Confirmar</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>¿Estás seguro de que deseas eliminar este registro?</strong></p>
    <p>Toda la información asociada a este registro se eliminará de forma permanente. Esta operación no se puede deshacer.</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Eliminar</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

//

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
  @Input() actionsButton: string;
  @Input() buttons: Buttons[] = [Buttons.edit, Buttons.disable, Buttons.delete];
  @Input() validation: boolean = false;
  @Output() editRecord: EventEmitter<object> ;
  @Output() disableRecord: EventEmitter<object> ;
  @Output() deleteRecord: EventEmitter<object> ;
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
    private modalService: NgbModal
  ) {
    this.editRecord = new EventEmitter();
    this.disableRecord = new EventEmitter();
    this.deleteRecord = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: object) {
    if(Object.keys(changes).length >= 1) {
      this.callObservableSearch();
    }
  }

  sendDataToEdit(item) {
    this.editRecord.emit(item);
  }
  sendDataToDisable(item) {
    this.disableRecord.emit(item);
  }
  sendDataToDelete(item) {
    this.deleteRecord.emit(item);
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
    data = data?.filter(origin => this.matches(origin, searchTerm, this.pipe));
    const total = data?.length;
    // 3. paginate
    data = data?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
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
    return( Object.keys(data).find(opc => opc != 'id' && data[opc].toString().toLowerCase().includes(term)) );
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

  // modal

  openModal(item: object) {
    const modal = this.modalService.open(NgbdModalConfirm);
    modal.result.then(result => {
      this.sendDataToDelete(item);
    }).catch(error => {});
  }
}
