import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { SelectCompensate, ServicesSettingsRR } from '../../../libraries/utilities.library';
import { MaintenanceOrdersCausesService } from 'src/app/services/maintenanceOrdersCauses/maintenance-orders-causes.service';
import { DataList } from '../../../models/general';
import { ToastService } from 'src/app/services/shared/toast.service';

@Component({
  selector: 'app-maintenance-orders-causes',
  templateUrl: './maintenance-orders-causes.component.html',
  styleUrls: ['./maintenance-orders-causes.component.scss'],
})
export class MaintenanceOrdersCausesComponent implements OnInit {
  MOCauseForm: FormGroup;
  selectYesNo: DataList[] = [];
  selectService: DataList[] = [];

  actionForm = 'create'; // create, update
  // table
  dataToTable: object[];
  structure: object[] = [
    {
      name: 'causeCode',
      description: 'Código causa',
      validation: '',
    },
    {
      name: 'diagnosticDescription',
      description: 'Descripción diagnóstico',
      validation: '',
    },
    {
      name: 'currentlyUse',
      description: 'Estado',
      validation: 'active-desactive'
    },
    {
      name: 'compensation',
      description: 'Compensa',
      validation: '',
    },
    {
      name: 'maintenance',
      description: 'En mantenimiento',
      validation: '',
    },
    {
      name: 'affectedServices',
      description: 'Servicios',
      validation: '',
    },
  ];

  constructor(
    private _fb: FormBuilder,
    private _causeSvc: MaintenanceOrdersCausesService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.MOCauseForm = this._fb.group({
      currentlyUse: ['', [Validators.required]],
      causeCode: ['', [Validators.required]],
      diagnosticDescription: ['', [Validators.required]],
      maintenance: ['', [Validators.required]],
      affectedServices: ['', [Validators.required]],
      compensation: ['', [Validators.required]],
      user: [''],
    });
  }

  ngOnInit(): void {}

  invalidFieldForm(fieldName: string) {
    return (
      this.MOCauseForm.get(fieldName).touched &&
      this.MOCauseForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(this.MOCauseForm, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectCompensate)) {
      this.selectYesNo.push({ key: i[1], value: i[0] });
    }
    for (const i of Object.entries(ServicesSettingsRR)) {
      this.selectService.push({ key: i[0], value: i[1] });
    }
    this.initialCharge(); // table
  }

  initialCharge() {
  }

  ngAfterViewInit() { // seteado
    setTimeout(()=>{
      this.dataToTable = [
        {
          currentlyUse: 'SI',
          causeCode: 'T10',
          diagnosticDescription: 'Daño puerto telefonico eMTA',
          maintenance: 'SI',
          affectedServices: 'Telefonia',
          compensation: 'Si',
        },
        {
          currentlyUse: 'SI',
          causeCode: 'L13',
          diagnosticDescription: 'Cambio MTA Dañado',
          maintenance: 'SI',
          affectedServices: 'Telefonia-Internet',
          compensation: 'Si',
        },
        {
          currentlyUse: 'SI',
          causeCode: 'DH2',
          diagnosticDescription: 'DTH Conectores Sueltos o En Daño',
          maintenance: 'SI',
          affectedServices: 'TvDth',
          compensation: 'Si',
        },
        {
          currentlyUse: 'SI',
          causeCode: 'D95',
          diagnosticDescription: 'Aprov.Incompleto Reparar',
          maintenance: 'SI',
          affectedServices: 'Tv-Telefonia-Internet',
          compensation: 'Si',
        },
        {
          currentlyUse: 'SI',
          causeCode: 'WT0',
          diagnosticDescription: 'Wth Simcard Danada',
          maintenance: 'SI',
          affectedServices: 'VozDth-@Dth',
          compensation: 'Si',
        }
      ];
    },100)
  }

  onSubmit() {
    console.log(this.MOCauseForm.value);
    
    if (this.MOCauseForm.invalid) {
      return Object.values(this.MOCauseForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
    }
  }

  cleanForm() {
    this.MOCauseForm.reset({
      currentlyUse: '',
      maintenance: '',
      compensation: '',
    });
    this.actionForm = 'create';
  }
}
