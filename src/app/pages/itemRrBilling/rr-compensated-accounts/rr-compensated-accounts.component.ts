import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { DataList } from '../../../models/general';
import { RrCompensatedAccountsService } from 'src/app/services/rrCompensatedAccounts/rr-compensated-accounts.service';
import * as models from '../../../models/rr-compensated-accounts';
import { ToastService } from 'src/app/services/shared/toast.service';

@Component({
  selector: 'app-rr-compensated-accounts',
  templateUrl: './rr-compensated-accounts.component.html',
  styleUrls: ['./rr-compensated-accounts.component.scss'],
})
export class RrCompensatedAccountsComponent implements OnInit {
  currentDate: Date = new Date();
  nameSelectedTable: string;
  selectTableList: DataList[];

  // forms
  rrCompensatedAccountsForm: FormGroup;
  compensationDetailForm: FormGroup;
  TCAAUF00Form: FormGroup;
  compensationNoteForm: FormGroup;
  actionForm = 'create'; // create, update
  selectedForm: number = null;

  // table
  dataToTable:
    | models.CompensationDetailModel[]
    | models.TotalCompensationModel[]
    | models.CompensationNoteModel[];
  dataToSelectedTable: any[];
  structure: object[] = [];

  // api services and download file
  name_selectedTable: DataList;
  dataRequest: any;
  columNames: { english: string[]; spanish: string[] };
  nameTableSelected_download: string = '';

  constructor(
    private _fb: FormBuilder,
    private _RrCompensatedAccountsScv: RrCompensatedAccountsService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.rrCompensatedAccountsForm = this._fb.group({
      tableOptions: ['', [Validators.required]],
    });
    this.rrCompensatedAccountsForm
      .get('tableOptions')
      .valueChanges.subscribe((selectValue) => {
        this.selectedTable(selectValue.key);
      });

    this.compensationDetailForm = this._fb.group({
      id: [''],
      account: ['', [Validators.required]],
      categoryDescription: ['', [Validators.required]],
      serviceName: ['', [Validators.required]],
      serviceDescription: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      trfPqrWarning: ['', [Validators.required]],
      ticketNumber: ['', [Validators.required]],
      date: ['', [Validators.required]],
      lastRentDate: ['', [Validators.required]],
      compensationCode: ['', [Validators.required]],
      averangeDefValue: ['', [Validators.required]],
      compesationValue: ['', [Validators.required]],
    });
    this.TCAAUF00Form = this._fb.group({
      id: [''],
      account: ['', [Validators.required]],
      compensationValue: ['', [Validators.required]],
      compensationcode: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
    this.compensationNoteForm = this._fb.group({
      id: [''],
      account: ['', [Validators.required]],
      note: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  invalidFieldForm(fieldName: string) {
    return (
      this.rrCompensatedAccountsForm.get(fieldName).touched &&
      this.rrCompensatedAccountsForm.get(fieldName).invalid
    );
  }

  invalidField_compensationDetailForm(fieldName: string) {
    return (
      this.compensationDetailForm.get(fieldName).touched &&
      this.compensationDetailForm.get(fieldName).invalid
    );
  }

  invalidField_TCAAUF00Form(fieldName: string) {
    return (
      this.TCAAUF00Form.get(fieldName).touched &&
      this.TCAAUF00Form.get(fieldName).invalid
    );
  }

  invalidField_compensationNotesForm(fieldName: string) {
    return (
      this.compensationNoteForm.get(fieldName).touched &&
      this.compensationNoteForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(
      this.rrCompensatedAccountsForm,
      field
    );
  }

  textsFormInvalid_compensationDetailForm(field: string) {
    return this._gnrScv.validationFormTextRequired(
      this.compensationDetailForm,
      field
    );
  }

  textsFormInvalid_TCAAUF00Form(field: string) {
    return this._gnrScv.validationFormTextRequired(this.TCAAUF00Form, field);
  }

  textsFormInvalid_compensationNotesForm(field: string) {
    return this._gnrScv.validationFormTextRequired(
      this.compensationNoteForm,
      field
    );
  }

  initializeVariables() {
    this.selectTableList = [
      { key: 'DetalleCompensacion', value: 'DetalleCompensacion' },
      { key: 'TCAAUF00', value: 'TCAAUF00' },
      { key: 'NotasCompensacion', value: 'Notas_Compensacion' },
    ];
  }

  selectedTable(selectedTable: string) {
    console.log(this.rrCompensatedAccountsForm);
    switch (selectedTable) {
      case 'DetalleCompensacion':
        this.structure = this._RrCompensatedAccountsScv.structureCompensationDetails().structure;
        this._RrCompensatedAccountsScv
          .allCompensationDetails()
          .subscribe((resp: models.CompensationDetailsApiModel) => {
            this.dataToTable = resp.CompensationsDetails.CompensationDetail;
          });
        this.columNames = this._RrCompensatedAccountsScv.structureCompensationDetails().columNames;
        this.name_selectedTable = this.selectTableList[0];
        this.selectedForm = 1;
        break;

      case 'TCAAUF00':
        this.structure = this._RrCompensatedAccountsScv.structureTotalCompensation().structure;
        this._RrCompensatedAccountsScv
          .allTotalCompensation()
          .subscribe((resp: models.TotalCompensationApiModel) => {
            this.dataToTable = resp.TblTotalCompensation.TblTotalCompensation;
          });
        this.columNames = this._RrCompensatedAccountsScv.structureTotalCompensation().columNames;
        this.name_selectedTable = this.selectTableList[1];
        this.selectedForm = 2;
        break;

      case 'NotasCompensacion':
        this.structure = this._RrCompensatedAccountsScv.structureCompensationNotes().structure;
        this._RrCompensatedAccountsScv
          .allCompensationNotes()
          .subscribe((resp: models.CompensationNotesApiModel) => {
            this.dataToTable = resp.TblCompensationNote.TblCompensationNote;
          });
        this.columNames = this._RrCompensatedAccountsScv.structureCompensationNotes().columNames;
        this.name_selectedTable = this.selectTableList[2];
        this.selectedForm = 3;
        break;

      default:
        break;
    }
  }

  updateData(dataSelected: any) {
    this.scrollUp();
    this.setForm(dataSelected);
    this.actionForm = 'update';
  }

  setForm(data: any) {
    console.log(data, this.selectedForm);

    switch (this.selectedForm) {
      case 1:
        this.compensationDetailForm.reset({
          id: data.id,
          account: data.account,
          categoryDescription: data.categoryDescription,
          serviceName: data.serviceName,
          serviceDescription: data.serviceDescription,
          productName: data.productName,
          trfPqrWarning: data.trfPqrWarning,
          ticketNumber: data.ticketNumber,
          date: new Date(data.date + ' 00:00:00'),
          lastRentDate: data.lastRentDate,
          compensationCode: data.compensationCode,
          averangeDefValue: data.averangeDefValue,
          compesationValue: data.compesationValue,
        });

        break;

      case 2:
        this.TCAAUF00Form.reset({
          id: data.idTotalCompensation,
          account: data.account,
          compensationValue: data.compensationValue,
          compensationcode: data.compensationcode,
          date: new Date(
            data.date.slice(0, 4) +
              '-' +
              data.date.slice(4, 6) +
              '-' +
              data.date.slice(6, 8) +
              ' 00:00:00'
          ),
        });
        break;

      case 3:
        this.compensationNoteForm.reset({
          id: data.idNotaCompensacion,
          account: data.account,
          note: data.note,
        });
        break;

      default:
        break;
    }
    console.log(this.compensationDetailForm.value);
  }

  scrollUp() {
    document
      .getElementById('editScrollTop')
      .scrollIntoView({ behavior: 'smooth' });
  }

  onSubmit_compensationDetailForm() {
    console.log(this.compensationDetailForm.value);
    if (this.compensationDetailForm.invalid) {
      return Object.values(this.compensationDetailForm.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
    } else {
      this.formatDate();
      this.structuredData();
    }
  }

  onSubmit_TCAAUF00Form() {
    console.log(this.TCAAUF00Form.value);
    if (this.TCAAUF00Form.invalid) {
      return Object.values(this.TCAAUF00Form.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.formatDate();
      console.log(this.TCAAUF00Form.value);

      this.structuredData();
    }
  }

  onSubmit_compensationNoteForm() {
    console.log(this.compensationNoteForm.value);
    if (this.compensationNoteForm.invalid) {
      return Object.values(this.compensationNoteForm.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
    } else {
      this.structuredData();
    }
  }

  formatDate() {
    switch (this.selectedForm) {
      case 1:
        this.compensationDetailForm
          .get('date')
          .setValue(
            this.compensationDetailForm
              .get('date')
              .value.toISOString()
              .substring(0, 10)
          );
        this.compensationDetailForm
          .get('lastRentDate')
          .setValue(
            this.compensationDetailForm
              .get('lastRentDate')
              .value.toISOString()
              .substring(0, 10)
          );
        break;
      case 2:
        this.TCAAUF00Form.get('date').setValue(
          this.TCAAUF00Form.get('date').value.toISOString().substring(0, 10)
        );
        break;
      default:
        break;
    }
  }

  structuredData() {
    this.ApiOptions('structureData');

    if (this.actionForm === 'create') {
      this.ApiOptions('createData');
    } else if (this.actionForm === 'update') {
      this.ApiOptions('updateData');
    }
  }

  ApiOptions(actionApi: string, dataAditionals?: Object[]) {
    switch (this.name_selectedTable.value) {
      case this.selectTableList[0].value: // DetalleCompensacion_YYYYMMDDhhmmss
        if (actionApi === 'structureData') {
          this.dataRequest = this._RrCompensatedAccountsScv.structureRequest_CompensationDetail(
            this.compensationDetailForm.value
          );
        } else if (actionApi === 'createData') {
          this._RrCompensatedAccountsScv
            .createRequest_CompensationDetail(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrCompensatedAccountsScv
            .updateRequest_CompensationDetail(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrCompensatedAccountsScv
            .deleteRequest_CompensationDetail(dataAditionals['id'])
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      case this.selectTableList[1].value: // TCAAUF00_YYYMMDDhhmmss
        if (actionApi === 'structureData') {
          console.log('entra a estructurar la data');

          this.dataRequest = this._RrCompensatedAccountsScv.structureRequest_TotalCompensation(
            this.TCAAUF00Form.value
          );
          console.log('data estructurada', this.dataRequest);
        } else if (actionApi === 'createData') {
          this._RrCompensatedAccountsScv
            .createRequest_TotalCompensation(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrCompensatedAccountsScv
            .updateRequest_TotalCompensation(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrCompensatedAccountsScv
            .deleteRequest_TotalCompensation(
              dataAditionals['idTotalCompensation']
            )
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      case this.selectTableList[2].value: // Notas_Compensacion_YYYMMDDhhmmss
        if (actionApi === 'structureData') {
          this.dataRequest = this._RrCompensatedAccountsScv.structureRequest_CompensationNote(
            this.compensationNoteForm.value
          );
        } else if (actionApi === 'createData') {
          this._RrCompensatedAccountsScv
            .createRequest_CompensationNote(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrCompensatedAccountsScv
            .updateRequest_CompensationNote(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrCompensatedAccountsScv
            .deleteRequest_CompensationNote(
              dataAditionals['idNotaCompensacion']
            )
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      default:
        break;
    }
  }

  nameSelectedTable_Download(selected: string) {
    this.nameTableSelected_download = selected;
  }

  downloadDataTable() {
    if (this.dataToTable.length > 0) {
      this.exportToCsv(this.dataToTable);
    }
  }

  exportToCsv(rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }

    const separator = '   ';
    const keys = this.columNames.english;
    const keysSpanish = this.columNames.spanish;
    const csvContent =
      keysSpanish.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell.toLocaleString();
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, this.nameTableSelected_download + '.csv');
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', this.nameTableSelected_download + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this._toastScv.showSuccess('Archivo descargado correctamente');
      }
    }
  }

  deleteData(
    dataSelected:
      | models.CompensationDetailModel[]
      | models.TotalCompensationModel[]
      | models.CompensationNoteModel[]
  ) {
    this.ApiOptions('deleteData', dataSelected);
  }

  reloadTableData() {
    this.selectedTable(this.name_selectedTable.key);
  }

  messageToCustomer(resp: models.ResponseModel) {
    if (resp.GeneralResponse.code === '0') {
      this._toastScv.showSuccess(
        resp.GeneralResponse.messageCode,
        resp.GeneralResponse.descriptionCode
      );
      this.cleanForm();
      this.reloadTableData();
    } else {
      this._toastScv.showError(
        resp.GeneralResponse.messageCode,
        resp.GeneralResponse.descriptionCode
      );
    }
  }

  cleanForm() {
    this.compensationDetailForm.reset();
    this.TCAAUF00Form.reset();
    this.compensationNoteForm.reset();
    this.actionForm = 'create';
  }
}
