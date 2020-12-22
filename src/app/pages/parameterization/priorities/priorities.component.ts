import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { GeneralFunctionsService } from 'src/app/services/general-functions.service';
import {
  SelectCompensate,
  SelectStatus,
} from 'src/app/libraries/utilities.library';
import { DataList } from 'src/app/models/general';
import { PriorityService } from '../../../services/priority/priority.service';
import {
  PriorityModel,
  requestModel,
  responseModel,
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
  // table
  priorities$: Observable<PriorityModel[]>;
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
    });
  }

  ngOnInit(): void {
    this._prioritySvc.allPriorities();
  }

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
      this.selectQuestion.push({ key: i[0], value: i[1] });
    }
    // table
    this.priorities$ = this._prioritySvc.priorities$;
  }

  onSubmit() {
    if (this.priorityForm.invalid) {
      return Object.values(this.priorityForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      const dataRequest: requestModel = {
        priority: {
          priorityId: this.priorityForm.get('priorityId').value,
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
        console.log('entra a create 1');

        this.createPriorityApi(dataRequest);
      } else {
        console.log('entra a update 1');
        this.updatePriorityApi(dataRequest);
      }
    }
  }

  createPriorityApi(dataRequest: requestModel) {
    this._prioritySvc
      .createPriority(dataRequest)
      .subscribe((resp: responseModel) => {
        if (resp.generalResponse.code === '0') {
          this._toastScv.showSuccess(resp.generalResponse.messageCode);
          this.cleanForm();
          this._prioritySvc.allPriorities();
        } else {
          this._toastScv.showError(resp.generalResponse.messageCode);
        }
      });
  }
  updatePriorityApi(dataRequest: requestModel) {
    this._prioritySvc.updatePriority(dataRequest).subscribe((resp) => {
      if (resp.generalResponse.code === '0') {
        this._toastScv.showSuccess(resp.generalResponse.messageCode);
        this.cleanForm();
        this._prioritySvc.allPriorities();
      } else {
        this._toastScv.showError(resp.generalResponse.messageCode);
      }
    });
  }

  updatePriority(priority: PriorityModel) {
    console.log(priority);

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

  deletePriority(priority: PriorityModel) {
    this._prioritySvc.deletePriority(priority.priorityId).subscribe((resp) => {
      if (resp.generalResponse.code === '0') {
        this._toastScv.showSuccess(resp.generalResponse.messageCode);
        this._prioritySvc.allPriorities();
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
