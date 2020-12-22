import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StratumService } from '../../../services/stratum/stratum.service';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../services/shared/toast.service';
import { strataApiModel, stratumModel, requestModel, responseModel } from '../../../models/stratum';
import { ButtonsTable as Buttons } from '../../../libraries/utilities.library';

@Component({
  selector: 'app-stratum',
  templateUrl: './stratum.component.html',
  styleUrls: ['./stratum.component.scss']
})

export class StratumComponent implements OnInit {
  formStratum: FormGroup;
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
    }
  ];
  buttonToTable: Buttons[] = [Buttons.edit, Buttons.delete]

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
      code: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      creationDate: ['']
    })
  }
  get invalidCode() {
    return this.formStratum.get('code').touched && this.formStratum.get('code').invalid;
  }
  get invalidDescription() {
    return this.formStratum.get('description').touched && this.formStratum.get('description').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrSvc.validationFormTextRequired(this.formStratum, field);
  }

  initializeVariables() {
    this.initialCharge(); // table
  }
  initialCharge() {
    this.cleanForm();
    this.stratumSvc.allStrata().subscribe((resp: strataApiModel) => {
      this.dataToTable = resp.socialStatus;
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
          'description': this.formStratum.get('description').value
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
        this.toastScv.showSuccess(resp.generalResponse.messageCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.generalResponse.messageCode);
      }
    })
  }
  updateStratumApi(dataRequest: requestModel) {
    this.stratumSvc.updateStratum(dataRequest).subscribe((resp: responseModel) => {
      if(resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.generalResponse.messageCode);
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
      creationDate: data.creationDate
    });
  }

  deleteStratum(stratum: stratumModel) {
    this.stratumSvc.deleteStratum(stratum.idSocialStatus).subscribe(resp => {
      if(resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.generalResponse.messageCode);
      }
    })
  }

  cleanForm() {
    this.formStratum.reset();
    this.actionForm = 'create';
  }
}
