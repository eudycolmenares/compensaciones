import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '@services/general-functions.service';
import {
  SelectCompensate,
  SelectStatus,
} from '@libraries/utilities.library';
import { DataList } from '@models/general';
import { PriorityService } from '@services/priority/priority.service';
import {
  PrioritiesApiModel,
  PriorityModel,
  RequestModel,
  ResponseModel,
} from '@models/priority';
import { ToastService } from '@shared_services/toast.service';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.scss'],
})
export class PrioritiesComponent implements OnInit {
  priorityForm: FormGroup;
  selectState: DataList[] = [];
  selectQuestion: DataList[] = [];

  actionForm = 'create'; // create, update
  dataToTable: PriorityModel[];
  structure: object[] = [
    {
      name: 'priorityCode',
      description: 'Código',
      validation: '',
    },
    {
      name: 'priorityDescription',
      description: 'Descripción',
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
    private _prioritySvc: PriorityService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService,
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.priorityForm = this._fb.group({
      priorityId: [],
      priorityCode: ['', [Validators.required, Validators.maxLength(100)]],
      priorityDescription: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  invalidFieldForm(fieldName: string) {
    return (
      this.priorityForm.get(fieldName).touched &&
      this.priorityForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(this.priorityForm, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectState.push({ key: i[1], value: i[0] });
    }
    for (const i of Object.entries(SelectCompensate)) {
      this.selectQuestion.push({ key: i[1], value: i[0] });
    }
    this.initialCharge(); // table
  }

  initialCharge() {
    this._prioritySvc.allPriorities().subscribe((resp: PrioritiesApiModel) => {
      if (resp.generalResponse.code == '0') {
        this.dataToTable = resp.priority;
      } else { this._toastScv.showError(resp.generalResponse.messageCode); }
    });
  }

  onSubmit() {
    if (this.priorityForm.invalid) {
      return Object.values(this.priorityForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      const dataRequest: RequestModel = {
        priority: {
          priorityCode: this.priorityForm.get('priorityCode').value,
          priorityDescription: this.priorityForm.get('priorityDescription').value,
          state: this.priorityForm.get('state').value,
        },
      };
      if (this.actionForm === 'create') {
        this.createPriorityApi(dataRequest);
      } else {
        dataRequest.priority.priorityId = this.priorityForm.get('priorityId').value;
        this.updatePriorityApi(dataRequest);
      }
    }
  }

  createPriorityApi(dataRequest: RequestModel) {
    this._prioritySvc
      .createPriority(dataRequest)
      .subscribe((resp: ResponseModel) => {
        if (resp.generalResponse.code === '0') {
          this._toastScv.showSuccess(resp.generalResponse.messageCode);
          this.cleanForm();
          this.initialCharge(); // table
        } else {
          this._toastScv.showError(resp.generalResponse.messageCode);
        }
      });
  }

  updatePriorityApi(dataRequest: RequestModel) {
    this._prioritySvc.updatePriority(dataRequest).subscribe((resp) => {
      if (resp.generalResponse.code === '0') {
        this._toastScv.showSuccess(resp.generalResponse.messageCode);
        this.cleanForm();
        this.initialCharge(); // table
      } else {
        this._toastScv.showError(resp.generalResponse.messageCode);
      }
    });
  }

  updatePriority(priority: PriorityModel) {
    this.setForm(priority);
    this.actionForm = 'update';
  }

  setForm(data: PriorityModel) {
    this.priorityForm.reset({
      priorityId: data.priorityId,
      priorityCode: data.priorityCode,
      priorityDescription: data.priorityDescription,
      state: data.state,
    });
  }

  returnServiceName(data: PriorityModel): string[] {
    const arraySvc = ['television', 'internet', 'telephone']; // acomodar
    let svcSelected = [];
    for (const key in data) {
      if (arraySvc.indexOf(key) > -1 && data[key] === '1') {
        svcSelected.push(key);
      }
    }
    return svcSelected;
  }

  disablePriority(priority: PriorityModel) {
    const dataRequest: RequestModel = {
      priority: {
        ...priority,
        state: (priority.state.toString() === '0') ? 1 : 0
      }
    };
    this.updatePriorityApi(dataRequest);
  }

  deletePriority(priority: PriorityModel) {
    this._prioritySvc.deletePriority(priority.priorityId).subscribe((resp) => {
      if (resp.generalResponse.code === '0') {
        this._toastScv.showSuccess(resp.generalResponse.messageCode);
        this.initialCharge(); // table
      } else {
        this._toastScv.showError(resp.generalResponse.messageCode);
      }
    });
  }

  cleanForm() {
    this.priorityForm.reset({
      state: '',
      compensatesNode: '',
      compensatesAccount: '',
    });
    this.actionForm = 'create';
  }
}
