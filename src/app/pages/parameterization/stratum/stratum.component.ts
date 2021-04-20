import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StratumService } from '../../../services/stratum/stratum.service';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../shared/services/toast.service';
import { strataApiModel, stratumModel, requestModel, responseModel } from '../../../models/stratum';
import { ButtonsTable as Buttons, SelectStatus } from '../../../libraries/utilities.library';

@Component({
  selector: 'app-stratum',
  templateUrl: './stratum.component.html',
  styleUrls: ['./stratum.component.scss']
})

export class StratumComponent implements OnInit {
  formStratum: FormGroup;
  selectStatus: object[] = [];
  actionForm = 'create'; // create, update
  // table
  dataToTable: stratumModel[];
  structure: object[] = [
    {
      name: 'statusSocial',
      description: 'Estrato',
      validation: '',
    },
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
  buttonToTable: Buttons[] = [Buttons.edit, Buttons.disable, Buttons.delete]

  constructor(
    private stratumSvc: StratumService,
    private fb: FormBuilder,
    private gnrSvc: GeneralFunctionsService,
    private toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formStratum = this.fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', Validators.required],
      creationDate: ['']
    })
  }
  get invalidCode() {
    return this.formStratum.get('code').touched && this.formStratum.get('code').invalid;
  }
  get invalidDescription() {
    return this.formStratum.get('description').touched && this.formStratum.get('description').invalid;
  }
  get invalidState() {
    return this.formStratum.get('state').touched && this.formStratum.get('state').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrSvc.validationFormTextRequired(this.formStratum, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectStatus.push({key: i[1], value: i[0]})
    }
    this.initialCharge(); // table
  }
  initialCharge() {
    this.cleanForm();
    this.stratumSvc.allStrata().subscribe((resp: strataApiModel) => {
      if (resp.generalResponse.code == '0') {
        this.dataToTable = resp.socialStatus;
      } else { this.toastScv.showError(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode); }

    });
  }

  onSubmit() {
    if(this.formStratum.invalid) {
      return Object.values(this.formStratum.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      const dataRequest: requestModel = {
        'SocialStatus': {
          'statusSocial': this.formStratum.get('code').value,
          'description': this.formStratum.get('description').value,
          'state': this.formStratum.get('state').value,
        }
      }
      if(this.actionForm === 'create') {
        this.createStratumApi(dataRequest);
      }else { // update
        dataRequest.SocialStatus.idSocialStatus = this.formStratum.get('id').value;
        this.updateStratumApi(dataRequest);
      }
    }
  }
  createStratumApi(dataRequest: requestModel) {
    this.stratumSvc.createStratum(dataRequest).subscribe((resp: responseModel) => {
      if(resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
      }
    })
  }
  updateStratumApi(dataRequest: requestModel) {
    this.stratumSvc.updateStratum(dataRequest).subscribe((resp: responseModel) => {
      if(resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
      }
    })
  }

  updateStratum(stratum: stratumModel) {
    this.setForm(stratum);
    this.actionForm = 'update';
  }
  setForm(data: stratumModel) {
    this.formStratum.reset({
      id: data.idSocialStatus,
      code: data.statusSocial,
      description: data.description,
      state: data.state,
      creationDate: data.creationDate
    });
  }

  disableStratum(stratum: stratumModel) {
    const dataRequest: requestModel = {
      SocialStatus: {
        ...stratum,
        state: (stratum.state.toString() === '0') ? '1' : '0'
      }
    };
    this.updateStratumApi(dataRequest);
  }

  deleteStratum(stratum: stratumModel) {
    this.stratumSvc.deleteStratum(stratum.idSocialStatus).subscribe(resp => {
      if(resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
      }
    })
  }

  cleanForm() {
    this.formStratum.reset({
      state: ''
    });
    this.actionForm = 'create';
  }
}
