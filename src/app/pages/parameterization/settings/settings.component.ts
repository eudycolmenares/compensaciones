import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  StrataSettings as Strata,
  SelectStatus,
  ServicesSettings as Services
} from '../../../libraries/utilities.library';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { SettingsService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  strataBase: object[] = [];
  strata: object[] = [];
  selectStatus: object[] = [];
  servicesBase: object[] = [];
  services: object[] = [];
  formStgs: FormGroup;
  invalidStrata = false;
  invalidServices = false;
  msgErrorEmpty = 'El campo es obligatorio';

  constructor(
    private fb: FormBuilder,
    private gnrScv: GeneralFunctionsService,
    private stgsSvc : SettingsService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
  }

  initializeVariables() {
    for (const i of Object.values(Strata)) {
      this.strataBase.push({key: i, value: i})
    }
    for (const i of Object.entries(SelectStatus)) {
      this.selectStatus.push({key: i[1], value: i[0]})
    }
    for (const i of Object.entries(Services)) {
      this.servicesBase.push({key: i[0], value: i[1]})
    }
  }

  createForm() {
    this.formStgs = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(20)]],
      state: ['', Validators.required],
      strataBase: [''],
      strata: [''],
      services: [''],
      servicesBase: ['']
    })
  }

  get invalidCode() {
    return this.formStgs.get('code').touched && this.formStgs.get('code').invalid;
  }
  get invalidDescription() {
    return this.formStgs.get('description').touched && this.formStgs.get('description').invalid;
  }
  get invalidState() {
    return this.formStgs.get('state').touched && this.formStgs.get('state').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrScv.validationFormTextRequired(this.formStgs, field);
  }

  assignChoices(fieldForm: string, caseUse: string) {
    const optionsSel: string[] = this.formStgs.get(fieldForm).value;
    if(optionsSel) {
      optionsSel.map(opc => {
        switch (caseUse) {
          case 'strata':
            const foundStrata = this.strata.find(stratum => stratum['key'] === opc);
            if(!foundStrata) {
              this.strata.push(this.strataBase.filter(stratum => stratum['key'] === opc)[0]);
              this.invalidStrata = false;
            }
            break;
          case 'services':
            const foundSvcs = this.services.find(svc => svc['key'] === opc);
            if(!foundSvcs) {
              this.services.push(this.servicesBase.filter(svc => svc['key'] === opc)[0]);
              this.invalidServices = false;
            }
            break;
        }
      })
    }
  }
  removeChoices(fieldForm: string, caseUse: string) {
    const optionsSel: string[] = this.formStgs.get(fieldForm).value;
    if(optionsSel) {
      optionsSel.map(opc => {
        if(caseUse === 'strata') {
          this.strata = this.strata.filter(stratum => stratum['key'] != opc);
        }else if('services') {
          this.services = this.services.filter(svc => svc['key'] != opc);
        }
      })
    }
  }

  onSubmit() {
    console.log('sigue lo siguiente!!!');
    const dataRequest = {
      'setting': {
        'code': this.formStgs.get('code').value,
        'description': this.formStgs.get('description').value,
        'state': this.formStgs.get('state').value,
        'user': 'test',
        'socialStratum': '6',
        'television': '1',
        'internet': '0',
        'telephone': '0'
      }
    }
    this.stgsSvc.createSetting(dataRequest).subscribe(data => {
      console.log('respuesta servicio create: ', data);

    })



    if(this.formStgs.invalid) {
      (this.strata.length === 0) ? this.invalidStrata = true : '';
      (this.services.length === 0) ? this.invalidServices = true : '';
      return Object.values(this.formStgs.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      (this.strata.length === 0) ? this.invalidStrata = true : '';
      (this.services.length === 0) ? this.invalidServices = true : '';
      if(this.invalidStrata===true || this.invalidServices===true) {
        return false;
      }





    }
  }
}
