import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from 'src/app/services/general-functions.service';
import {
  SelectCompensate,
  SelectStatus,
} from 'src/app/libraries/utilities.library';
import { DataList } from 'src/app/models/general';
import { PriorityService } from '../../../services/priority/priority.service';
import {
  PrioritiesApiModel,
  PriorityModel,
  RequestModel,
  ResponseModel,
} from 'src/app/models/priority';
import { ToastService } from 'src/app/services/shared/toast.service';

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
    {
      name: 'nodecompensates',
      description: 'Compensa Nodo',
      validation: 'yes-no',
    },
    {
      name: 'accountscompensates',
      description: 'Compensa Cuenta',
      validation: 'yes-no',
    },
  ];
  constructor(
    private _fb: FormBuilder,
    private _prioritySvc: PriorityService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.priorityForm = this._fb.group({
      priorityId: [],
      priorityCode: ['', [Validators.required]],
      priorityDescription: ['', [Validators.required]],
      state: ['', [Validators.required]],
      compensatesNode: ['', [Validators.required]],
      compensatesAccount: ['', [Validators.required]],
      user: [''],
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
      this.dataToTable = resp.priority;
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
          priorityDescription: this.priorityForm.get('priorityDescription')
            .value,
          state: this.priorityForm.get('state').value,
          nodecompensates: this.priorityForm.get('compensatesNode').value,
          accountscompensates: this.priorityForm.get('compensatesAccount')
            .value,
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
      compensatesNode: data.nodecompensates,
      compensatesAccount: data.accountscompensates,
    });
  }

  returnServiceName(data: PriorityModel): string[] {
    const arraySvc = ['television', 'internet', 'telephone'];
    let svcSelected = [];
    for (const key in data) {
      if (arraySvc.indexOf(key) > -1 && data[key] === '1') {
        svcSelected.push(key);
      }
    }
    return svcSelected;
  }

  disablePriority(priority: PriorityModel) {
    const dataRequest: RequestModel = { priority: { ...priority, state: 0 } };
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
    this.priorityForm.reset();
    this.actionForm = 'create';
  }
}
