import { Component, OnInit, QueryList, ViewChildren  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { GeneralFunctionsService } from 'src/app/services/general-functions.service';
import { ServicesSettings, SelectStatus, SelectCompensate } from 'src/app/libraries/utilities.library';
import { SystemStatusService } from 'src/app/services/system-status/system-status.service';
import { DataList } from '../../../models/general';
import { ToastService } from 'src/app/services/shared/toast.service';
import { SystemStatusModel } from 'src/app/models/system-status';

@Component({
  selector: 'app-system-status',
  templateUrl: './system-status.component.html',
  styleUrls: ['./system-status.component.scss']
})
export class SystemStatusComponent implements OnInit {
  systemStatusForm: FormGroup;
  selectService: DataList[] = [];
  selectState: DataList[] = [];
  selectQuestion: DataList[] = [];

  actionForm = 'create'; // create, update
  // table
  systemStatus$: Observable<SystemStatusModel[]>;
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
      descriptionStatus: ['', [Validators.required]],
      compensates: ['', [Validators.required]],
      status: ['', [Validators.required]],
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
    return this._gnrScv.validationFormTextRequired(this.systemStatusForm, field);
  }

  initializeVariables() {
    for (const i of Object.entries(ServicesSettings)) {
      this.selectService.push({ key: i[1], value: i[0] });
    }
    for (const i of Object.entries(SelectStatus)) {
      this.selectState.push({ key: i[1], value: i[0] });
    }
    for (const i of Object.entries(SelectCompensate)) {
      this.selectQuestion.push({ key: i[1], value: i[0] });
    }
    // table
    this.systemStatus$ = this._systemStatusSvc.systemStatus$;
  }

  onSubmit() {
    if (this.systemStatusForm.invalid) {
      return Object.values(this.systemStatusForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      console.log('sigue lo siguiente!!!');
    }
  }

}
