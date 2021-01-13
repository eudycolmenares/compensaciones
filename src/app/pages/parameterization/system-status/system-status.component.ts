import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from 'src/app/services/general-functions.service';
import {
  SelectStatus,
  SelectCompensate,
} from 'src/app/libraries/utilities.library';
import {
  SystemStatusModel,
  SystemStatusApiModel,
  RequestModel,
  ResponseModel,
} from 'src/app/models/system-status';
import { SystemStatusService } from 'src/app/services/system-status/system-status.service';
import { DataList } from '../../../models/general';
import { ToastService } from 'src/app/services/shared/toast.service';

@Component({
  selector: 'app-system-status',
  templateUrl: './system-status.component.html',
  styleUrls: ['./system-status.component.scss'],
})
export class SystemStatusComponent implements OnInit {
  systemStatusForm: FormGroup;
  selectService: DataList[] = [];
  selectState: DataList[] = [];
  selectQuestion: DataList[] = [];

  actionForm = 'create'; // create, update
  // table
  dataToTable: SystemStatusModel[];
  structure: object[] = [
    {
      name: 'description',
      description: 'Descripción',
      validation: '',
    },
    {
      name: 'compensate',
      description: 'Compensa',
      validation: 'yes-no',
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive',
    },
  ];
  constructor(
    private _fb: FormBuilder,
    private _systemStatusSvc: SystemStatusService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.systemStatusForm = this._fb.group({
      id: [],
      description: ['', [Validators.required]],
      compensate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      user: [''],
    });
  }

  ngOnInit(): void {
    this._systemStatusSvc.allSystemStatus();
  }

  invalidFieldForm(fieldName: string) {
    return (
      this.systemStatusForm.get(fieldName).touched &&
      this.systemStatusForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(
      this.systemStatusForm,
      field
    );
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectState.push({ key: i[1], value: i[0] });
    }
    for (const i of Object.entries(SelectCompensate)) {
      this.selectQuestion.push({ key: i[1], value: i[0] });
    }
    // table
    this.initialCharge();
  }

  initialCharge() {
    this._systemStatusSvc
      .allSystemStatus()
      .subscribe((resp: SystemStatusApiModel) => {
        this.dataToTable = resp.SystemsStatus.SystemStatus;
      });
  }

  onSubmit() {
    if (this.systemStatusForm.invalid) {
      return Object.values(this.systemStatusForm.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
    } else {
      const dataRequest: RequestModel = {
        SystemStatus: {
          description: this.systemStatusForm.get('description').value,
          compensate: this.systemStatusForm.get('compensate').value,
          state: this.systemStatusForm.get('status').value,
          user: 'test', // seteado
        },
      };
      if (this.actionForm === 'create') {
        this.createSystemStatusApi(dataRequest);
      } else {
        dataRequest.SystemStatus.id = this.systemStatusForm.get('id').value;
        this.updateSystemStatusApi(dataRequest);
      }
    }
  }

  createSystemStatusApi(dataRequest: RequestModel) {
    this._systemStatusSvc
      .createSystemStatus(dataRequest)
      .subscribe((resp: ResponseModel) => {
        if (resp.GeneralResponse.code === '0') {
          this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
          this.cleanForm();
          this.initialCharge();
        } else {
          this._toastScv.showError(resp.GeneralResponse.messageCode);
        }
      });
  }

  updateSystemStatusApi(dataRequest: RequestModel) {
    this._systemStatusSvc.updateSystemStatus(dataRequest).subscribe((resp) => {
      if (resp.GeneralResponse.code === '0') {
        this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.cleanForm();
        this.initialCharge();
      } else {
        this._toastScv.showError(resp.GeneralResponse.messageCode);
      }
    });
  }

  updateSystemStatus(systemStatus: SystemStatusModel) {
    this.setForm(systemStatus);
    this.actionForm = 'update';
  }

  setForm(data: SystemStatusModel) {
    this.systemStatusForm.reset({
      id: data.id,
      description: data.description,
      compensate: data.compensate,
      status: data.state,
      user: data.user,
    });
  }

  disableSystemStatus(systemStatus: SystemStatusModel) {
    const dataRequest: RequestModel = {
      SystemStatus: { ...systemStatus, state: '0' },
    };
    this.updateSystemStatusApi(dataRequest);
  }

  deleteSystemStatus(systemStatus: SystemStatusModel) {
    this._systemStatusSvc
      .deleteSystemStatus(systemStatus.id)
      .subscribe((resp) => {
        if (resp.GeneralResponse.code === '0') {
          this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
          this.initialCharge();
        } else {
          this._toastScv.showError(resp.GeneralResponse.messageCode);
        }
      });
  }

  cleanForm() {
    this.systemStatusForm.reset({ compensate: '', status: '' });
    this.actionForm = 'create';
  }
}
