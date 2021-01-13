import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../services/shared/toast.service';
import { SelectStatus, SelectCompensate, ServicesSettings as Services } from '../../../libraries/utilities.library';

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
  services: object[] = [];
  // table
  dataToTable: object[];
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
      name: 'compensate',
      description: 'Compensa',
      validation: 'yes-no',
    },
    {
      name: 'maintenance',
      description: 'Mantenimiento',
      validation: 'yes-no'
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
    },
  ];

  constructor(
    private fb: FormBuilder,
    private gnrSvc: GeneralFunctionsService,
    private toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() { // seteado
    setTimeout(()=>{
      this.dataToTable = [
        {
          code: 'T1',
          description: 'Descripción sintoma T1',
          state: '1',
          compensate: '1',
          maintenance: '0',
          telephone: '0',
          television: '1',
          internet: '0'
        }
      ];
    },100)
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      maintenance: ['', Validators.required],
      state: ['', Validators.required],
      compensate: ['', Validators.required],
      services: ['', Validators.required],
      user: [''],
      updateDate: ['']
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
  }
  initialCharge() {
    this.cleanForm();
    // this.symptomSvc.allSymptoms().subscribe((resp: symptomsApiModel) => {
    //   this.dataToTable = resp.symptom;
    // });
  }

  onSubmit() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      // seteado
      this.toastScv.showSuccess('Registro emulado correctamente');
      this.initialCharge();
    }
  }

  cleanForm() {
    this.form.reset();
    this.actionForm = 'create';
  }
}
