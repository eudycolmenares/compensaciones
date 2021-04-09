import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { MaintenanceOrdersSymptomsService } from '../../../services/maintenanceOrdersSymptoms/maintenance-orders-symptoms.service';
import { ToastService } from '../../../shared/services/toast.service';
import { SelectStatus, SelectCompensate, ServicesSettings as Services } from '../../../libraries/utilities.library';
import {
  requestOrderSymptomModel as  requestModel,
  orderSymptomModel
} from '../../../models/maintenance-orders-symptoms';
import { DataList } from '../../../models/general';

@Component({
  selector: 'app-maintenance-orders-symptoms',
  templateUrl: './maintenance-orders-symptoms.component.html',
  styleUrls: ['./maintenance-orders-symptoms.component.scss']
})

export class MaintenanceOrdersSymptomsComponent implements OnInit {
  form: FormGroup;
  actionForm = 'create'; // create, update
  selectStatus: object[] = [];
  selectCompensate: object[] = [];
  services: DataList[] = [];
  // table
  dataToTable: object[];
  structure: object[] = [
    {
      name: 'diagnostic',
      description: 'Código',
      validation: '',
    },
    {
      name: 'diagnosticDescription',
      description: 'Descripción',
      validation: '',
    },
    {
      name: 'compensation',
      description: 'Compensa',
      validation: 'yes-no',
    },
    {
      name: 'maintenance',
      description: 'Mantenimiento',
      validation: 'yes-no'
    },
    {
      name: 'phone',
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
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive'
    },
  ];

  constructor(
    private fb: FormBuilder,
    private gnrSvc: GeneralFunctionsService,
    private toastScv: ToastService,
    private symptomsSvc : MaintenanceOrdersSymptomsService,
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      maintenance: ['', Validators.required],
      state: ['', Validators.required],
      compensate: ['', Validators.required],
      services: ['', Validators.required],
    })
  }
  get invalidCode() {
    return this.form.get('code').touched && this.form.get('code').invalid;
  }
  get invalidDescription() {
    return this.form.get('description').touched && this.form.get('description').invalid;
  }
  get invalidCompensate() {
    return this.form.get('compensate').touched && this.form.get('compensate').invalid;
  }
  get invalidMaintenance() {
    return this.form.get('maintenance').touched && this.form.get('maintenance').invalid;
  }
  get invalidState() {
    return this.form.get('state').touched && this.form.get('state').invalid;
  }
  get invalidServices() {
    return this.form.get('services').touched && this.form.get('services').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrSvc.validationFormTextRequired(this.form, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectStatus.push({key: i[1], value: i[0]})
    }
    for (const i of Object.entries(SelectCompensate)) {
      this.selectCompensate.push({key: i[1], value: i[0]})
    }
    for (const i of Object.entries(Services)) {
      this.services.push({key: i[0], value: i[1]})
    }
    this.initialCharge(); // table
  }
  initialCharge() {
    this.cleanForm();
    this.symptomsSvc.allOrdersSymptoms().subscribe((resp) => {
      this.dataToTable = resp.list;
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      const servicesSelected = this.form.get('services').value;
      const dataRequest: requestModel = {
        'maintenanceOrderDiagnostic': {
          'diagnostic': this.form.get('code').value,
          'diagnosticDescription': this.form.get('description').value,
          'state': this.form.get('state').value,
          'maintenance': (this.form.get('maintenance').value === '1') ?  'Si' : 'No',
          'compensation': (this.form.get('compensate').value === '1') ?  'Si' : 'No' ,
          'television': (servicesSelected.find((svc: DataList) => svc.key === 'television') ? 1 : 0),
          'internet': (servicesSelected.find((svc: DataList) => svc.key === 'internet') ? 1 : 0),
          'phone': (servicesSelected.find((svc: DataList) => svc.key === 'telephone') ? 1 : 0)
        }
      }
      if(this.actionForm === 'create') {
        this.createOrderSymptomApi(dataRequest);
      }else { // update
        dataRequest.maintenanceOrderDiagnostic.id = this.form.get('id').value;
        this.updateOrderSymptomApi(dataRequest);
      }
    }
  }
  createOrderSymptomApi(dataRequest: requestModel) {
    this.symptomsSvc.createOrderSymptom(dataRequest).subscribe(resp => {
      if(resp.response.code === '0') {
        this.toastScv.showSuccess(resp.response.descriptionCode, resp.response.messageCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.response.descriptionCode, resp.response.messageCode);
      }
    })
  }
  updateOrderSymptomApi(dataRequest: requestModel) {
    this.symptomsSvc.updateOrderSymptom(dataRequest).subscribe(resp => {
      if(resp.response.code === '0') {
        this.toastScv.showSuccess(resp.response.descriptionCode, resp.response.messageCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.response.descriptionCode, resp.response.messageCode);
      }
    })
  }

  updateOrderSymptom(orderSymptom: orderSymptomModel) {
    this.setForm(orderSymptom);
    this.actionForm = 'update';
  }
  setForm(data: orderSymptomModel) {
    data['telephone'] = data.phone;
    this.form.reset({
      id: data.id,
      code: data.diagnostic,
      description: data.diagnosticDescription,
      state: data.state,
      maintenance: (data.maintenance.toUpperCase() === 'SI') ? '1': '0',
      compensate: (data.compensation.toUpperCase() === 'SI') ? '1': '0',
      services: this.services.filter((item: DataList) => data[item.key] === 1)
    });
  }

  disableOrderSymptom(orderSymptom: orderSymptomModel) {
    const dataRequest: requestModel = { maintenanceOrderDiagnostic: {...orderSymptom, state: 0} };
    this.updateOrderSymptomApi(dataRequest);
  }

  deleteOrderSymptom(orderSymptom: orderSymptomModel) {
    this.symptomsSvc.deleteOrderSymptom(orderSymptom.id).subscribe(resp => {
      if(resp.response.code === '0') {
        this.toastScv.showSuccess(resp.response.descriptionCode, resp.response.messageCode);
        this.initialCharge();
      }else{
        this.toastScv.showError(resp.response.descriptionCode, resp.response.messageCode);
      }
    })
  }

  cleanForm() {
    this.form.reset({
      state: '',
      compensate: '',
      maintenance: ''
    });
    this.actionForm = 'create';
  }
}
