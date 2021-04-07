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
  origin: originModel[] = [
    {
      id: 30,
      name: 'NODOS',
      description: 'Minimo',
      state: 1,
    },
    {
      id: 31,
      name: 'CUENTAS',
      description: 'FullStack',
      state: 1,
    },
    {
      id: 32,
      name: 'ORDENES',
      description: 'Ordenes de Mantenimiento',
      state: 1,
    },
    {
      id: 33,
      name: 'RR',
      description: 'RR',
      state: 1,
    },
  ]; // acomodar
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
      name: 'Disruption',
      subname: 'id',
      description: 'Código Anomalía',
      validation: 'object',
    },
    {
      name: 'Disruption',
      subname: 'description',
      description: 'Descripción Anomalía',
      validation: 'object',
    },
    {
      name: 'Problem',
      subname: 'id',
      description: 'Código Problema',
      validation: 'object',
    },
    {
      name: 'Problem',
      subname: 'description',
      description: 'Descripción Problema',
      validation: 'object',
    },
    {
      name: 'code',
      description: 'Código Causa',
      validation: '',
    },
    {
      name: 'description',
      description: 'Descripción Causa',
      validation: '',
    },
    {
      name: 'Origin',
      subname: 'id',
      description: 'Origen',
      validation: 'object',
    },
    {
      name: 'OriginType',
      subname: 'id',
      description: 'Tipo Origen',
      validation: 'object',
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
    private _authSvc: AuthService,
  ) {
    this.userData = this._authSvc.userData;
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.causeForm = this._fb.group({
      origin: ['', [Validators.required]],
      typeOrigin: ['', [Validators.required]],
      idCause: [''],
      codeAnomaly: ['', [Validators.required]],
      descriptionAnomaly: [''],
      problemCode: ['', [Validators.required]],
      descriptionProblem: [''],
      causeCode: ['', [Validators.required]],
      descriptionCause: ['', [Validators.required]],
      status: ['', [Validators.required]],
      user: [this.userData.usuario.usuario],
    });
    this.causeForm.get('origin').valueChanges.subscribe((selectValue) => {
      if (selectValue !== '30') {
        this.causeForm.get('codeAnomaly').setValue('');
        this.causeForm.get('descriptionAnomaly').setValue('');
        this.causeForm.get('problemCode').setValue('');
        this.causeForm.get('descriptionProblem').setValue('');
        this.causeForm.controls['codeAnomaly'].disable();
        this.causeForm.controls['descriptionAnomaly'].disable();
        this.causeForm.controls['problemCode'].disable();
        this.causeForm.controls['descriptionProblem'].disable();
      } else {
        this.causeForm.controls['codeAnomaly'].enable();
        this.causeForm.controls['descriptionAnomaly'].enable();
        this.causeForm.controls['problemCode'].enable();
        this.causeForm.controls['descriptionProblem'].enable();
      }
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
      this.originTypeList = resp.OriginTypes.OriginType;
    });
    this.initialCharge(); // table
  }

  initialCharge() {
    this._causeSvc.allCauses().subscribe((resp: CausesApiModel) => {
      this.dataToTable = resp.Causes.Cause;
    });
  }

  onSubmit() {
    if (this.causeForm.invalid) {
      return Object.values(this.causeForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      var servicesSelected = this.causeForm.get('services').value;
      const dataRequest: RequestModel = {
        Cause: {
          Disruption: {
            id: this.causeForm.get('codeAnomaly').value,
            description: this.causeForm.get('descriptionAnomaly').value,
          },
          Problem: {
            id: this.causeForm.get('problemCode').value,
            description: this.causeForm.get('descriptionProblem').value,
          },
          code: this.causeForm.get('causeCode').value,
          description: this.causeForm.get('descriptionCause').value,
          causes: this.causeForm.get('descriptionCause').value,
          Origin: {
            id: this.causeForm.get('origin').value,
          },
          OriginType: {
            id: this.causeForm.get('typeOrigin').value,
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
      codeAnomaly: data.Disruption.id,
      descriptionAnomaly: data.Disruption.description,
      problemCode: data.Problem.id,
      descriptionProblem: data.Problem.description,
      causeCode: data.code,
      descriptionCause: data.description,
      causes: data.description,
      origin: data.Origin.id,
      typeOrigin: data.OriginType.id,
      status: data.state,
      user: data.user,
    });
  }

  disableCause(cause: CauseModel) {
    const dataRequest: RequestModel = {
      Cause: { ...cause, state: '0' },
    };
    this.updateCauseApi(dataRequest);
  }

  deleteCause(cause: CauseModel) {
    this._causeSvc.deleteCause(cause.id).subscribe((resp) => {console.log(resp);

      if (resp.GeneralResponse.code === '0') {
        this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.initialCharge(); // table
      } else {
        this._toastScv.showError(resp.GeneralResponse.messageCode);
      }
    });
  }

  cleanForm() {
    this.causeForm.reset({ origin: '', typeOrigin: '', status: '' });
    this.actionForm = 'create';
  }
}
