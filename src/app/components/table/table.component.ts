import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ButtonsTable as Buttons } from '../../libraries/utilities.library';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() dataBase: object[];
  @Input() structure: object[];
  @Input() buttons: string[] = [Buttons.edit, Buttons.disable, Buttons.delete];
  @Input() validation: boolean = false;
  @Output() editRecord: EventEmitter<object> ;
  @Output() disableRecord: EventEmitter<object> ;
  @Output() deleteRecord: EventEmitter<object> ;
  // Filter colums to view
  cols: any[];
  _selectedColumns: any[];
  // Filter
  highAmount = [
    { label: 'Monto Alto', value: '1' },
    { label: 'Monto Bajo', value: '0' },
  ];
  randomKey: string;

  constructor(
    private confirmationSvc: ConfirmationService,
  ) {
    this.editRecord = new EventEmitter();
    this.disableRecord = new EventEmitter();
    this.deleteRecord = new EventEmitter();
    this.randomKey = Math.ceil(Math.random() * 10000).toString();
  }

  ngOnInit(): void {
    this.cols = this.structure.map(item => ({...item, field: item['name'], header: item['description']}) );
    this._selectedColumns = this.cols;
  }

  ngOnChanges() {
    this.ngOnInit();
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

  set selectedColumns(val: any[]) { //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  // modal

  openModal(item: object) {
    if (this.validation){
      this.sendDataToDelete(item);
    } else {
      this.confirmationSvc.confirm({
        message: `Toda la información asociada a este registro se eliminará de forma permanente. Esta operación no se puede deshacer.`,
        header: '¿Estás seguro de que deseas eliminar este registro?',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.sendDataToDelete(item);
        },
        reject: () => { },
        key: this.randomKey
      });
    }

  }
}
