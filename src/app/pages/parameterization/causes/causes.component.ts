import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '@services/general-functions.service';
import {
  ServicesSettings,
  SelectStatus,
} from '@libraries/utilities.library';
import {
  CauseModel,
  CausesApiModel,
  RequestModel,
  ResponseModel,
} from '@models/cause';
import { CauseService } from '@services/cause/cause.service';
import { OriginTypeService } from '@services/originType/origin-type.service';
import { DataList } from '@models/general';
import { ToastService } from '@shared_services/toast.service';
import {
  originsApiModel,
  originModel as originTypeModel,
} from '@models/origin-type';
import { ResponseLoginModel as UserModel } from '@models/users';
import { AuthService } from '@shared_services/auth.service';


import * as XLSX from 'xlsx';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

interface originModel {
  id: number;
  name: string;
  description: string;
  state: number;
} // acomodar

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.scss'],
})
export class CausesComponent implements OnInit {

  causeForm: FormGroup;
  selectState: DataList[] = [];
  selectService: DataList[] = [];
  selectOriginType: originsApiModel[];
  userData: UserModel = null;

  actionForm = 'create'; // create, update
  originTypeList: originTypeModel[];
  // table
  dataToTable: CauseModel[];
  structure: object[] = [
    {
      name: 'code',
      description: 'Código Causa',
      validation: '',
    },
    {
      name: 'problemCode',
      description: 'Código Problema',
      validation: '',
    },
    {
      name: 'failureCode',
      description: 'Código Falla',
      validation: '',
    },
    {
      name: 'CloneOriginType',
      description: 'Tipo Origen',
      validation: '',
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive',
    },
  ];
  //download file
  nameRowsExcelEnglish: string[] = [];
  nameRowsExcelSpanish: string[] = [];
  constructor(
    private _fb: FormBuilder,
    private _causeSvc: CauseService,
    public _originTypeSvc: OriginTypeService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService,
    private _authSvc: AuthService,
  ) {
    this.userData = this._authSvc.userData;
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.causeForm = this._fb.group({
      idCause: [''],
      causeCode: ['', [Validators.required]],
      problemCode: ['', [Validators.required]],
      failureCode: ['', [Validators.required]],
      typeOrigin: ['', [Validators.required]],
      status: ['', [Validators.required]],
      user: [this.userData.usuario.usuario],
    });
  }

  ngOnInit(): void {}

  invalidFieldForm(fieldName: string) {
    return (
      this.causeForm.get(fieldName).touched &&
      this.causeForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(this.causeForm, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectState.push({ key: i[1], value: i[0] });
    }
    this._originTypeSvc.allOrigins().subscribe((resp: originsApiModel) => {
      if (resp.GeneralResponse.code == '0') {
        this.originTypeList = resp.OriginTypes.OriginType;
      } else { this._toastScv.showError(resp.GeneralResponse.messageCode); }
    });
    this.initialCharge(); // table
  }

  initialCharge() {
    this._causeSvc.allCauses().subscribe((resp: CausesApiModel) => {
      if (resp.GeneralResponse.code == '0') {
        this.dataToTable = resp.Causes.Cause;
        this.dataToTable.map( (add) => {
          return add.CloneOriginType = add.OriginType.name;
        } );
        this.structure.forEach((data: {
          name: string;
          description: string;
          validation: string;
      }) => {
          this.nameRowsExcelSpanish.push(
            this.removeAccents(data.description.toLocaleUpperCase())
          );
          this.nameRowsExcelEnglish.push(data.name);
        });
      } else { this._toastScv.showError(resp.GeneralResponse.messageCode); }
    });
  }

  onSubmit() {
    console.log(this.causeForm.value);

    if (this.causeForm.invalid) {
      return Object.values(this.causeForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      const dataRequest: RequestModel = {
        Cause: {
          code: this.causeForm.get('causeCode').value,
          failureCode: this.causeForm.get('failureCode').value,
          problemCode: this.causeForm.get('problemCode').value,
          OriginType: {
            id: Number(this.causeForm.get('typeOrigin').value),
          },
          state: this.causeForm.get('status').value,
          user: this.userData.usuario.usuario,
        },
      };
      if (this.actionForm === 'create') {
        this.createCauseApi(dataRequest);
      } else {
        dataRequest.Cause.id = this.causeForm.get('idCause').value;
        this.updateCauseApi(dataRequest);
      }
    }
  }

  createCauseApi(dataRequest: RequestModel) {
    this._causeSvc.createCause(dataRequest).subscribe((resp: ResponseModel) => {
      if (resp.GeneralResponse.code === '0') {
        this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.cleanForm();
        this.initialCharge(); // table
      } else {
        this._toastScv.showError(resp.GeneralResponse.messageCode);
      }
    });
  }

  updateCauseApi(dataRequest: RequestModel) {
    this._causeSvc.updateCause(dataRequest).subscribe((resp) => {
      if (resp.GeneralResponse.code === '0') {
        this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.cleanForm();
        this.initialCharge(); // table
      } else {
        this._toastScv.showError(resp.GeneralResponse.messageCode);
      }
    });
  }

  updateCause(cause: CauseModel) {
    this.setForm(cause);
    this.actionForm = 'update';
  }

  setForm(data: CauseModel) {
    this.causeForm.reset({
      idCause: data.id,
      failureCode: data.failureCode,
      problemCode: data.problemCode,
      causeCode: data.code,
      typeOrigin: data.OriginType.id,
      status: data.state,
      user: data.user,
    });
  }

  disableCause(cause: CauseModel) {
    const dataRequest: RequestModel = {
      Cause: { ...cause,
        state: (cause.state.toString() === '0') ? '1' : '0',
        user: this.userData.usuario.usuario
      },
    };
    this.updateCauseApi(dataRequest);
  }

  deleteCause(cause: CauseModel) {
    this._causeSvc.deleteCause(cause.id).subscribe((resp) => {
      if (resp.GeneralResponse.code === '0') {
        this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.initialCharge(); // table
      } else {
        this._toastScv.showError(resp.GeneralResponse.messageCode);
      }
    });
  }

  cleanForm() {
    this.causeForm.reset({ typeOrigin: '', status: '' });
    this.actionForm = 'create';
  }





  downloadDataTable() {
    if (this.dataToTable.length > 0) {
      this.exportAsExcelFile(this.dataToTable);
    }
  }

  exportAsExcelFile(json: object[]): void {
    const csvContent = json.map((row) => {
      return this.nameRowsExcelEnglish.map((k) => {
        let cell = row[k] === null || row[k] === undefined ? '' : row[k];
        return cell;
      });
    });

    var worksheet = XLSX.utils.json_to_sheet([], {
      header: this.nameRowsExcelSpanish,
    });
    worksheet = XLSX.utils.sheet_add_json(worksheet, csvContent, {
      skipHeader: true,
      origin: 'A2',
    });
    const workbook: XLSX.WorkBook = {
      Sheets: { ['CAUSAS']: worksheet },
      SheetNames: ['CAUSAS'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer);
  }

  saveAsExcelFile(buffer: any): void {
    const blob: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(
        blob,
        'causas_' + new Date().getTime() + EXCEL_EXTENSION
      );
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          'causas_' +
            new Date().getTime() +
            EXCEL_EXTENSION
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this._toastScv.showSuccess('Archivo descargado correctamente');
      }
    }
  }

  removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
}
