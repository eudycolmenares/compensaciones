import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ButtonsTable as Buttons } from '../../libraries/utilities.library';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() dataBase: object[];
  @Input() structure: object[];
  @Input() buttons: Buttons[] = [Buttons.edit, Buttons.disable, Buttons.delete];
  @Output() editRecord: EventEmitter<object> ;
  @Output() disableRecord: EventEmitter<object> ;
  @Output() deleteRecord: EventEmitter<object> ;
  // Filter colums to view
  cols: any[];
  _selectedColumns: any[];

  constructor(private http: HttpClient) {
    this.editRecord = new EventEmitter();
    this.disableRecord = new EventEmitter();
    this.deleteRecord = new EventEmitter();
  }

  ngOnInit(): void {
    this.cols = this.structure.map(item => ({...item, field: item['name'], header: item['description']}) );
    this._selectedColumns = this.cols;
    console.log('this.cols: ', this.cols);
    console.log('structure: ', this.structure);
    console.log('dataBase: ', this.dataBase);
  }

  // ngOnChanges(changes: object) {
  //   console.log('ngOnChanges()', changes);
  //   if(Object.keys(changes).length >= 1) {
  //     // this.callObservableSearch();
  //   }
  // }

  sendDataToEdit(item) {
    this.editRecord.emit(item);
  }
  sendDataToDisable(item) {
    this.disableRecord.emit(item);
  }
  sendDataToDelete(item) {
    this.deleteRecord.emit(item);
  }

  set selectedColumns(val: any[]) { //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
}
