import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ObservationService } from '../../../services/observation/observation.service';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../shared/services/toast.service';
import { SelectStatus } from '../../../libraries/utilities.library';
import {
  ObservationModel,
  requestObservationModel as requestModel
} from '../../../models/observation';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})

export class ObservationComponent implements OnInit {
  form: FormGroup;
  selectStatus: object[] = [];
  dataToTable: ObservationModel[];
  structure: object[] = [
    {
      name: 'description',
      description: 'Descripción',
      validation: '',
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive'
    },
  ];
  actionForm = 'create'; // create, update

  constructor(
    private fb: FormBuilder,
    private observSvc: ObservationService,
    private gnrScv: GeneralFunctionsService,
    private toastScv: ToastService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', Validators.required],
    })
  }
  get invalidDescription() {
    return this.form.get('description').touched && this.form.get('description').invalid;
  }
  get invalidState() {
    return this.form.get('state').touched && this.form.get('state').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrScv.validationFormTextRequired(this.form, field);
  }
  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectStatus.push({key: i[1], value: i[0]})
    }
    this.initialCharge();
  }
  initialCharge() {
    this.cleanForm();
    this.observSvc.allObservation().subscribe(resp => {
      if (resp.GeneralResponse.code == '0') {
        this.dataToTable = resp.ObservationsToValidate.ObservationToValidate;
      } else { this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode); }
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      const dataRequest: requestModel = {
        'ObservationToValidate': {
          'description': this.form.get('description').value,
          'state': parseInt(this.form.get('state').value),
        }
      }
      if(this.actionForm === 'create') {
        this.createObservationApi(dataRequest);
      }else { // update
        dataRequest.ObservationToValidate.id = this.form.get('id').value;
        this.updateObservationApi(dataRequest);
      }
    }
  }
  createObservationApi(dataRequest: requestModel) {
    this.observSvc.createObservation(dataRequest).subscribe(resp => {
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.initialCharge();
      } else { this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode); }
    })
  }
  updateObservationApi(dataRequest: requestModel) {
    this.observSvc.updateObservation(dataRequest).subscribe(resp => {
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.initialCharge();
      } else { this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode); }
    });
  }

  updateObservation(observation: ObservationModel) {
    this.setForm(observation);
    this.actionForm = 'update';
  }
  setForm(data: ObservationModel) {
    this.form.reset({
      id: data.id,
      description: data.description,
      state: data.state,
    });
  }

  disableObservation(observation: ObservationModel) {
    const dataRequest: requestModel = {
      ObservationToValidate: {
        ...observation,
        state: (observation.state.toString() === '0') ? 1 : 0
      }
    };
    this.updateObservationApi(dataRequest);
  }

  deleteObservation(observation: ObservationModel) {
    this.observSvc.deleteObservation(observation.id).subscribe(resp => {
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.initialCharge();
      } else { this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode); }
    })
  }

  cleanForm() {
    this.form.reset( {'state': ''} );
    this.actionForm = 'create';
  }
}
