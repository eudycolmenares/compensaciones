import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ServicesSettings, SelectStatus } from '../../../libraries/utilities.library';
import { CauseModel, CausesApiModel, RequestModel, ResponseModel } from 'src/app/models/cause';
import { CauseService } from 'src/app/services/cause/cause.service';
import { OriginTypeService } from 'src/app/services/originType/origin-type.service';
import { DataList } from '../../../models/general';
import { ToastService } from 'src/app/services/shared/toast.service';
import { originsApiModel, originModel as originTypeModel } from 'src/app/models/origin-type';

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
      state: 1
    },
    {
      id: 31,
      name: 'CUENTAS',
      description: 'FullStack',
      state: 1
    },
    {
      id: 32,
      name: 'ORDENES',
      description: 'Ordenes de Mantenimiento',
      state: 1
    },
    {
      id: 33,
      name: 'RR',
      description: 'RR',
      state: 1
    }
  ]; // acomodar
  causeForm: FormGroup;
  selectState: DataList[] = [];
  selectService: DataList[] = [];
  selectOriginType: originsApiModel[];

  actionForm = 'create'; // create, update
  originTypeList: originTypeModel[];
  // table
  dataToTable: CauseModel[];
  structure: object[] = [
    {
      name: 'Disruption',
      subname: 'id',
      description: 'Código Anolamía',
      validation: 'object',
    },
    {
      name: 'Disruption',
      subname: 'description',
      description: 'Descripción Anolamía',
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
      validation: 'object'
    },
    {
      name: 'code',
      description: 'Código Causa',
      validation: ''
    },
    {
      name: 'description',
      description: 'Descripción Causa',
      validation: ''
    },
    {
      name: 'Origin',
      subname: 'id',
      description: 'Origen',
      validation: 'object'
    },
    {
      name: 'OriginType',
      subname: 'id',
      description: 'Tipo Origen',
      validation: 'object'
    },
    {
      name: 'internet',
      description: 'Internet',
      validation: 'service'
    },
    {
      name: 'telephone',
      description: 'Telefonía',
      validation: 'service'
    },
    {
      name: 'television',
      description: 'Televisión',
      validation: 'service'
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive'
    },
  ];
  constructor(
    private _fb: FormBuilder,
    private _causeSvc: CauseService,
    public _originTypeSvc: OriginTypeService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.causeForm = this._fb.group({
      idCause: [''],
      codeAnomaly: ['', [Validators.required]],
      descriptionAnomaly: [''],
      problemCode: ['', [Validators.required]],
      descriptionProblem: ['', [Validators.required]],
      causeCode: [''],
      descriptionCause: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      typeOrigin: [''],
      services: [''],
      status: [''],
      user: [''],
    });
  }

  ngOnInit(): void {
    this._causeSvc.allCauses();
    this._originTypeSvc.allOrigins();
  }

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
    for (const i of Object.entries(ServicesSettings)) {
      this.selectService.push({ key: i[1], value: i[0] });
    }
    for (const i of Object.entries(SelectStatus)) {
      this.selectState.push({ key: i[1], value: i[0] });
    }
    // table
    this.initialCharge();
  }

  initialCharge() {
    this._originTypeSvc.allOrigins().subscribe(async (resp: originsApiModel) => {
      this.originTypeList = await resp.OriginTypes.OriginType;
    });
    this._causeSvc.allCauses().subscribe(async (resp: CausesApiModel) => {
      this.dataToTable = await resp.Causes.Cause;
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
        Causes:{
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
          Origin: {
            id: this.causeForm.get('origin').value,
          },
          OriginType: {
            id: this.causeForm.get('typeOrigin').value,
          },
          television: (servicesSelected.find(svc => svc === 'television') ? '1' : '0'),
          internet: (servicesSelected.find(svc => svc === 'internet') ? '1' : '0'),
          telephone: (servicesSelected.find(svc => svc === 'telephone') ? '1' : '0'),
          state: this.causeForm.get('status').value,
          user: 'test', // seteado
        },
        }
      };
      if (this.actionForm === 'create') {
        console.log('entra a create 1', dataRequest);return

        this.createCauseApi(dataRequest);
      } else {
        console.log('entra a update 1');
        this.updateCauseApi(dataRequest);
      }
    }
  }

  createCauseApi(dataRequest: RequestModel) {
    this._causeSvc
      .createCause(dataRequest)
      .subscribe((resp: ResponseModel) => {
        if (resp.GeneralResponse.code === '0') {
          this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
          this.cleanForm();
          this._causeSvc.allCauses();
        } else {
          this._toastScv.showError(resp.GeneralResponse.messageCode);
        }
      });
  }

  updateCauseApi(dataRequest: RequestModel) {
    dataRequest.Causes.Cause.id = this.causeForm.get('idCause').value;
    this._causeSvc.updateCause(dataRequest).subscribe((resp) => {
      if (resp.GeneralResponse.code === '0') {
        this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.cleanForm();
        this._causeSvc.allCauses();
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
      codeAnomaly: data.code,
      descriptionAnomaly: data.description,
      problemCode: data.Problem.id,
      descriptionProblem: data.Problem.description,
      causeCode: data.Disruption.id,
      descriptionCause: data.Disruption.description,
      origin: data.Origin.id,
      typeOrigin: data.OriginType.id,
      services: this.returnServiceName(data),
      status: data.state,
      user: data.user,
    });
    console.log(this.causeForm.value);
    
  }
  returnServiceName(data: CauseModel): string[] {
    const arraySvc = ['television', 'internet', 'telephone'];
    let svcSelected = [];
    for (const key in data) {
      if(arraySvc.indexOf(key) > -1 && data[key] === '1') {
        svcSelected.push(key);
      }
    }
    return svcSelected;
  }

  disableCause(cause: CauseModel) {
    const dataRequest: RequestModel = {Causes: { Cause: {...cause, state: '0'} }};
    this.updateCauseApi(dataRequest);
  }

  deleteCause(cause: CauseModel) {
    this._causeSvc.deleteCause(cause.id).subscribe((resp) => {
      if (resp.GeneralResponse.code === '0') {
        this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this._causeSvc.allCauses();
      } else {
        this._toastScv.showError(resp.GeneralResponse.messageCode);
      }
    });
  }

  cleanForm() {
    this.causeForm.reset();
    this.actionForm = 'create';
  }
}
