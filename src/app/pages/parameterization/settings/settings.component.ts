import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelectStatus, ServicesSettings as Services } from '../../../libraries/utilities.library';
import { DataList } from '../../../models/general';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { SettingsService } from '../../../services/settings/settings.service';
import { StratumService } from '../../../services/stratum/stratum.service';
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/services/auth.service';
import { requestSettingsModel as requestModel, settingModel, settingsApiModel } from '../../../models/settings';
import { strataApiModel, stratumModel } from "../../../models/stratum";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  strataBase: stratumModel[] = [];
  selectStatus: object[] = [];
  servicesBase: DataList[] = [];
  formStgs: FormGroup;
  actionForm = 'create'; // create, update
  // table
  dataToTable: settingModel[];
  structure: object[] = [
    {
      name: 'code',
      description: 'Código',
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
    {
      name: 'socialStratum',
      description: 'Estrato',
      validation: '',
    },
    {
      name: 'telephone',
      description: 'Telefonía',
      validation: 'service'
    },
    {
      name: 'television',
      description: 'Televisión',
      validation: 'service'
    },
    {
      name: 'internet',
      description: 'Internet',
      validation: 'service'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private gnrScv: GeneralFunctionsService,
    private stgsSvc : SettingsService,
    private stratumSvc : StratumService,
    private toastScv: ToastService,
    private authSvc: AuthService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
    this.stgsSvc.allSettings();
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectStatus.push({key: i[1], value: i[0]})
    }
    for (const i of Object.entries(Services)) {
      this.servicesBase.push({key: i[0], value: i[1]})
    }
    this.stratumSvc.allStrata().subscribe((resp: strataApiModel) => {
      this.strataBase = resp.socialStatus;
      this.compareToSort(this.strataBase)
    })
    this.initialCharge(); // table
  }
  initialCharge() {
    this.cleanForm();
    this.stgsSvc.allSettings().subscribe((resp: settingsApiModel) => {
      this.dataToTable = resp.Settings.Setting.map(setting => ({
          ...setting,
          socialStratum: setting.socialStratums?.socialStratum.map(stratum => stratum['statusSocial'])
      }));
    });
  }

  createForm() {
    this.formStgs = this.fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', Validators.required],
      strata: ['', Validators.required],
      services: ['', Validators.required],
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
  get invalidStrata() {
    return this.formStgs.get('strata').touched && this.formStgs.get('strata').invalid;
  }
  get invalidServices() {
    return this.formStgs.get('services').touched && this.formStgs.get('services').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrScv.validationFormTextRequired(this.formStgs, field);
  }

  onSubmit() {
    if(this.formStgs.invalid) {
      return Object.values(this.formStgs.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      const servicesSelected = this.formStgs.get('services').value;
      const dataRequest: requestModel = {
        'Setting': {
          'code': this.formStgs.get('code').value,
          'description': this.formStgs.get('description').value,
          'state': parseInt(this.formStgs.get('state').value),
          'user': this.authSvc.userData.usuario.usuario,
          'socialStratums': {
              socialStratum: this.formStgs.get('strata').value
                .map((stratum: stratumModel) => ({ idSocialStatus: stratum.idSocialStatus }))
          },
          'television': (servicesSelected.find((svc: DataList) => svc.key === 'television') ? '1' : '0'),
          'internet': (servicesSelected.find((svc: DataList) => svc.key === 'internet') ? '1' : '0'),
          'telephone': (servicesSelected.find((svc: DataList) => svc.key === 'telephone') ? '1' : '0')
        }
      }
      if(this.actionForm === 'create') {
        this.createSettingApi(dataRequest);
      }else { // update
        dataRequest.Setting.id = this.formStgs.get('id').value;
        this.updateSettingApi(dataRequest);
      }
    }
  }
  createSettingApi(dataRequest: requestModel) {
    this.stgsSvc.createSetting(dataRequest).subscribe(resp => {
      if(resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    })
  }
  updateSettingApi(dataRequest: requestModel) {
    this.stgsSvc.updateSetting(dataRequest).subscribe(resp => {
      if(resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    })
  }

  updateSetting(setting: settingModel) {
    this.setForm(setting);
    this.actionForm = 'update';
  }
  setForm(data: settingModel) {
    this.formStgs.reset({
      id: data.id,
      code: data.code,
      description: data.description,
      state: data.state,
      strata: data.socialStratums.socialStratum,
      services: this.servicesBase.filter((item: DataList) => data[item.key] === '1')
    });
  }

  disableSetting(setting: settingModel) {
    const dataRequest: requestModel = { Setting: {...setting, state: 0} };
    this.updateSettingApi(dataRequest);
  }

  deleteSetting(setting: settingModel) {
    this.stgsSvc.deleteSetting(setting.id).subscribe(resp => {
      if(resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    })
  }

  compareToSort(items: stratumModel[]) {
    return items.sort((a, b) => parseInt(a.statusSocial) - parseInt(b.statusSocial));;
  }
  cleanForm() {
    this.formStgs.reset({'state': ''});
    this.actionForm = 'create';
  }
}
