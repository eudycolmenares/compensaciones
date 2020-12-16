import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { SymptomService } from '../../../services/symptom/symptom.service';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../services/shared/toast.service';
import {
  SelectStatus,
  ServicesSettings as Services
} from '../../../libraries/utilities.library';
import { requestModel, responseModel } from '../../../models/symptom';

interface originModel {
  id: number;
  name: string;
  description: string;
  state: number;
}

@Component({
  selector: 'app-symptom',
  templateUrl: './symptom.component.html',
  styleUrls: ['./symptom.component.scss']
})

export class SymptomComponent implements OnInit {
  origin: originModel[] = [
    {
      id: 30,
      name: 'NODOS',
      description: 'Minimo',
      state: 1
    },
    {
      id: 31,
      name: 'CUENTAS',
      description: 'FullStack',
      state: 1
    },
    {
      id: 32,
      name: 'ORDENES',
      description: 'Ordenes de Mantenimiento',
      state: 1
    },
    {
      id: 33,
      name: 'RR',
      description: 'RR',
      state: 1
    }
  ];
  formSymptom: FormGroup;
  actionForm = 'create'; // create, update
  selectStatus: object[] = [];
  services: object[] = [];
  // table
  symptoms$: Observable<any[]>; // acomodar

  constructor(
    private fb: FormBuilder,
    private symptomSvc: SymptomService,
    private gnrScv: GeneralFunctionsService,
    private toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
    this.symptomSvc.allSymptoms();
  }

  createForm() {
    this.formSymptom = this.fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(40)]],
      state: ['', Validators.required],
      origin: ['', Validators.required],
      services: ['', Validators.required]
    })
  }
  get invalidCode() {
    return this.formSymptom.get('code').touched && this.formSymptom.get('code').invalid;
  }
  get invalidDescription() {
    return this.formSymptom.get('description').touched && this.formSymptom.get('description').invalid;
  }
  get invalidState() {
    return this.formSymptom.get('state').touched && this.formSymptom.get('state').invalid;
  }
  get invalidOrigin() {
    return this.formSymptom.get('origin').touched && this.formSymptom.get('origin').invalid;
  }
  get invalidServices() {
    return this.formSymptom.get('services').touched && this.formSymptom.get('services').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrScv.validationFormTextRequired(this.formSymptom, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectStatus.push({key: i[1], value: i[0]})
    }
    for (const i of Object.entries(Services)) {
      this.services.push({key: i[0], value: i[1]})
    }
    // table
    this.symptoms$ = this.symptomSvc._settings$;
  }

  onSubmit() {
    if(this.formSymptom.invalid) {
      return Object.values(this.formSymptom.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      const originSelected = this.origin.find(item => item['id'] == this.formSymptom.get('origin').value);
      const servicesSelected = this.formSymptom.get('services').value;
      const dataRequest: requestModel = {
        'symptom': {
          'symptomCode': this.formSymptom.get('code').value,
          'description': this.formSymptom.get('description').value,
          'state': this.formSymptom.get('state').value,
          'originId': originSelected['id'],
          'origin': originSelected['name'],
          'television': (servicesSelected.find(svc => svc === 'television') ? '1' : '0'),
          'internet': (servicesSelected.find(svc => svc === 'internet') ? '1' : '0'),
          'telephone': (servicesSelected.find(svc => svc === 'telephone') ? '1' : '0'),
          'user': 'test', // seteado
        }
      }
      if(this.actionForm === 'create') {
        this.createApi(dataRequest);
      }else {
        // this.updateSettingApi(dataRequest);
      }
    }
  }
  createApi(dataRequest: requestModel) {
    this.symptomSvc.createSymptom(dataRequest).subscribe((resp: responseModel) => {
      console.log('resp: ',resp);
      if(resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode);
        this.cleanForm();
        // this.symptomSvc.allSettings(); // acomodar
      }else{
        this.toastScv.showError(resp.generalResponse.messageCode);
      }
    })
  }

  cleanForm() {
    this.formSymptom.reset();
    this.actionForm = 'create';
  }
}