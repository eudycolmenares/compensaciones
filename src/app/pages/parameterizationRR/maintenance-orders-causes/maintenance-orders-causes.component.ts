import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import {
  SelectCompensate,
  ServicesSettings,
  SelectStatus,
} from '../../../libraries/utilities.library';
import { MaintenanceOrdersCausesService } from 'src/app/services/maintenanceOrdersCauses/maintenance-orders-causes.service';
import { DataList } from '../../../models/general';
import { ToastService } from '../../../shared/services/toast.service';
import {
  MaintenanceOrderCauseModel,
  RequestModel,
  ResponseModel,
} from 'src/app/models/maintenance-orders-causes';

@Component({
  selector: 'app-maintenance-orders-causes',
  templateUrl: './maintenance-orders-causes.component.html',
  styleUrls: ['./maintenance-orders-causes.component.scss'],
})
export class MaintenanceOrdersCausesComponent implements OnInit {
  MOCauseForm: FormGroup;
  selectYesNo: DataList[] = [];
  selectService: DataList[] = [];
  selectStatus: DataList[] = [];

  actionForm = 'create'; // create, update
  // table
  dataToTable: object[];
  structure: object[] = [
    {
      name: 'cause',
      description: 'Código causa',
      validation: '',
    },
    {
      name: 'diagnosticDescription',
      description: 'Descripción diagnóstico',
      validation: '',
    },
    {
      name: 'compensation',
      description: 'Compensa',
      validation: '',
    },
    {
      name: 'maintenance',
      description: 'En Mantenimiento',
      validation: '',
    },
    {
      name: 'affectedService',
      description: 'Servicios Afectados',
      validation: '',
    },
    {
      name: 'internet',
      description: 'Internet',
      validation: 'service',
    },
    {
      name: 'phone',
      description: 'Telefonía',
      validation: 'service',
    },
    {
      name: 'television',
      description: 'Telvisión',
      validation: 'service',
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive',
    },
  ];

  constructor(
    private _fb: FormBuilder,
    private _MOCauseSvc: MaintenanceOrdersCausesService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.MOCauseForm = this._fb.group({
      idMOcause: [null],
      currentlyUse: ['Si'],
      causeCode: ['', [Validators.required, Validators.maxLength(100)]],
      diagnosticDescription: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required]],
      compensation: ['', [Validators.required]],
      maintenance: ['', [Validators.required]],
      affectedServices: ['', [Validators.required]],
      detailAffectation: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {}

  invalidFieldForm(fieldName: string) {
    return (
      this.MOCauseForm.get(fieldName).touched &&
      this.MOCauseForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(this.MOCauseForm, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectCompensate)) {
      this.selectYesNo.push({ key: i[0], value: i[0] });
    }
    this.selectYesNo.splice(0, 1, { key: '', value: '- Seleccione -' });

    for (const i of Object.entries(ServicesSettings)) {
      this.selectService.push({ key: i[0], value: i[1] });
    }
    for (const i of Object.entries(SelectStatus)) {
      this.selectStatus.push({ key: i[1], value: i[0] });
    }
    this.initialCharge(); // table
  }

  initialCharge() {
    this._MOCauseSvc.allMaintenanceOrdersCauses().subscribe((resp: any) => {
      this.dataToTable = resp.list;
    });
  }

  onSubmit() {
    console.log(this.MOCauseForm.value);

    if (this.MOCauseForm.invalid) {
      return Object.values(this.MOCauseForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      let dataRequest: RequestModel = this.structuredData();

      if (this.actionForm === 'create') {
        this.createMaintenanceOrderCauseApi(dataRequest);
      } else {
        dataRequest.maintenanceOrderCause.id = this.MOCauseForm.get(
          'idMOcause'
        ).value;
        this.updateMaintenanceOrderCauseApi(dataRequest);
      }
    }
  }

  structuredData() {
    let servicesSelected = this.MOCauseForm.get('affectedServices').value;
    let data: RequestModel = {
      maintenanceOrderCause: {
        useActually: this.MOCauseForm.get('currentlyUse').value,
        cause: this.MOCauseForm.get('causeCode').value,
        diagnosticDescription: this.MOCauseForm.get('diagnosticDescription')
          .value,
        maintenance: this.MOCauseForm.get('maintenance').value,
        affectedService: this.MOCauseForm.get('detailAffectation').value,
        compensation: this.MOCauseForm.get('compensation').value,
        internet: servicesSelected.find((svc) => svc['key'] === 'internet')
          ? 1
          : 0,
        phone: servicesSelected.find((svc) => svc['key'] === 'telephone')
          ? 1
          : 0,
        television: servicesSelected.find((svc) => svc['key'] === 'television')
          ? 1
          : 0,
        state: this.MOCauseForm.get('state').value,
      },
    };
    return data;
  }

  createMaintenanceOrderCauseApi(dataRequest: RequestModel) {
    this._MOCauseSvc
      .createMaintenanceOrderCause(dataRequest)
      .subscribe((resp: ResponseModel) => {
        this.messageToCustomer(resp);
      });
  }

  updateMaintenanceOrderCauseApi(dataRequest: RequestModel) {
    this._MOCauseSvc
      .updateMaintenanceOrderCause(dataRequest)
      .subscribe((resp: ResponseModel) => {
        this.messageToCustomer(resp);
      });
  }

  messageToCustomer(resp: ResponseModel) {
    if (resp.response.code === '0') {
      this._toastScv.showSuccess(
        resp.response.descriptionCode,
        resp.response.messageCode
      );
      this.cleanForm();
      this.initialCharge(); // table
    } else {
      this._toastScv.showError(
        resp.response.descriptionCode,
        resp.response.messageCode
      );
    }
  }

  updateMaintenanceOrderCause(MOcause: MaintenanceOrderCauseModel) {
    this.scrollUp();
    this.setForm(MOcause);
    this.actionForm = 'update';
  }

  scrollUp() {
    document.getElementById("editScrollTop").scrollIntoView({behavior:"smooth"});
  }

  setForm(data: MaintenanceOrderCauseModel) {
    this.MOCauseForm.reset({
      idMOcause: data.id,
      currentlyUse: data.useActually,
      causeCode: data.cause,
      diagnosticDescription: data.diagnosticDescription,
      state: data.state,
      compensation: data.compensation,
      maintenance: data.maintenance,
      affectedServices: this.returnServiceName(data),
      detailAffectation: data.affectedService,
    });
  }

  returnServiceName(data: MaintenanceOrderCauseModel): string[] {
    let svcSelected = [];
    if (data.phone === 1) {
      svcSelected.push(
        this.selectService.filter((svc) => svc.key === 'telephone')[0]
      );
    }
    if (data.television === 1) {
      svcSelected.push(
        this.selectService.filter((svc) => svc.key === 'television')[0]
      );
    }
    if (data.internet === 1) {
      svcSelected.push(
        this.selectService.filter((svc) => svc.key === 'internet')[0]
      );
    }
    return svcSelected;
  }

  disableMaintenanceOrderCause(MOcause: MaintenanceOrderCauseModel) {
    const dataRequest: RequestModel = {
      maintenanceOrderCause: {
        ...MOcause,
        state: (MOcause.state.toString() === '0') ? 1 : 0
      },
    };
    this.updateMaintenanceOrderCauseApi(dataRequest);
  }

  deleteMaintenanceOrderCause(MOcause: MaintenanceOrderCauseModel) {
    this._MOCauseSvc
      .deleteMaintenanceOrderCause(MOcause.id)
      .subscribe((resp: ResponseModel) => {
        this.messageToCustomer(resp);
      });
  }

  cleanForm() {
    this.MOCauseForm.reset({
      currentlyUse: '',
      maintenance: '',
      compensation: '',
      state: '',
    });
    this.actionForm = 'create';
  }
}
