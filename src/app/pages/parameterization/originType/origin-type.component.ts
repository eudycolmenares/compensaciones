import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { OriginTypeService } from '../../../services/originType/origin-type.service';
import { ToastService } from '../../../services/shared/toast.service';
import { SelectStatus, SelectCompensate } from '../../../libraries/utilities.library';
import { originModel, requestModel, responseModel, originsApiModel } from '../../../models/origin-type'

@Component({
  selector: 'app-origin-type',
  templateUrl: './origin-type.component.html',
  styleUrls: ['./origin-type.component.scss']
})

export class OriginTypeComponent implements OnInit {
  formOrigin: FormGroup;
  actionForm = 'create'; // create, update
  selectStatus: object[] = [];
  selectCompensate: object[] = [];
  // table
  dataToTable: originModel[];
  structure: object[] = [
    {
      name: 'name',
      description: 'Nombre',
      validation: '',
    },
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
      name: 'user',
      description: 'Usuario',
      validation: ''
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private gnrSvc: GeneralFunctionsService,
    public originSvc: OriginTypeService,
    private toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formOrigin = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', Validators.required],
      compensate: ['', Validators.required],
      user: [''],
      updateDate: ['']
    })
  }
  get invalidName() {
    return this.formOrigin.get('name').touched && this.formOrigin.get('name').invalid;
  }
  get invalidDescription() {
    return this.formOrigin.get('description').touched && this.formOrigin.get('description').invalid;
  }
  get invalidCompensate() {
    return this.formOrigin.get('compensate').touched && this.formOrigin.get('compensate').invalid;
  }
  get invalidState() {
    return this.formOrigin.get('state').touched && this.formOrigin.get('state').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrSvc.validationFormTextRequired(this.formOrigin, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectStatus.push({key: i[1], value: i[0]})
    }
    for (const i of Object.entries(SelectCompensate)) {
      this.selectCompensate.push({key: i[1], value: i[0]})
    }
    this.initialCharge(); // table
  }
  initialCharge() {
    this.originSvc.allOrigins().subscribe((resp: originsApiModel) => {
      this.dataToTable = resp.OriginTypes.OriginType;
    });
  }

  onSubmit() {
    if(this.formOrigin.invalid) {
      return Object.values(this.formOrigin.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      const dataRequest: requestModel = {
        'OriginType': {
          'name': this.formOrigin.get('name').value,
          'description': this.formOrigin.get('description').value,
          'compensate': this.formOrigin.get('compensate').value,
          'state': this.formOrigin.get('state').value,
          'user': 'test', // seteado
        }
      }
      if(this.actionForm === 'create') {
        this.createOriginApi(dataRequest);
      }else { // update
        dataRequest.OriginType.id = this.formOrigin.get('id').value;
        this.updateOriginApi(dataRequest);
      }
    }
  }
  createOriginApi(dataRequest: requestModel) {
    this.originSvc.createOrigin(dataRequest).subscribe((resp: responseModel) => {
      if(resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.cleanForm();
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.GeneralResponse.messageCode);
      }
    })
  }
  updateOriginApi(dataRequest: requestModel) {
    this.originSvc.updateOrigin(dataRequest).subscribe(resp => {
      if(resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.cleanForm();
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.GeneralResponse.messageCode);
      }
    })
  }

  updateOrigin(origin: originModel) {
    this.setForm(origin);
    this.actionForm = 'update';
  }
  setForm(data: originModel) {
    this.formOrigin.reset({
      id: data.id,
      name: data.name,
      description: data.description,
      state: data.state,
      compensate: data.compensate,
      user: data.user,
      updateDate: data.updateDate
    });
  }

  disableOrigin(origin: originModel) {
    const dataRequest: requestModel = { OriginType: {...origin, state: '0'} };
    // delete dataRequest.OriginType.updateDate;
    this.updateOriginApi(dataRequest);
  }

  deleteOrigin(origin: originModel) {
    this.originSvc.deleteOrigin(origin.id).subscribe(resp => {
      if(resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.GeneralResponse.messageCode);
      }
    })
  }

  cleanForm() {
    this.formOrigin.reset();
    this.actionForm = 'create';
  }
}
