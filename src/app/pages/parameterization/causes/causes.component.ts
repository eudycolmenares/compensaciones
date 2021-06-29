import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '@services/general-functions.service';
import { SelectStatus } from '@libraries/utilities.library';
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
import { StructTableModel } from 'src/app/shared/models/parameters';

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
  structure: StructTableModel[] = [
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
  constructor(
    private _fb: FormBuilder,
    private _causeSvc: CauseService,
    public _originTypeSvc: OriginTypeService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService,
    private _authSvc: AuthService
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
      } else {
        this._toastScv.showError(resp.GeneralResponse.messageCode);
      }
    });
    this.initialCharge(); // table
  }

  initialCharge() {
    this._causeSvc.allCauses().subscribe((resp: CausesApiModel) => {
      if (resp.GeneralResponse.code == '0') {
        this.dataToTable = resp.Causes.Cause;
        this.dataToTable.map((add) => {
          return (add.CloneOriginType = add.OriginType.name);
        });
      } else {
        this._toastScv.showError(resp.GeneralResponse.messageCode);
      }
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
      Cause: {
        ...cause,
        state: cause.state.toString() === '0' ? '1' : '0',
        user: this.userData.usuario.usuario,
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
      this._gnrScv.exportDataToExcelFile(
        this.structure,
        this.dataToTable,
        'CAUSAS'
      );
    }
  }
}
