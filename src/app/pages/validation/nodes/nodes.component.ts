import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import {
  SelectCompensate,
  ServicesSettings,
} from '../../../libraries/utilities.library';
import { NodesValidationService } from 'src/app/services/nodes-validation/nodes-validation.service';
import { DataList } from '../../../models/general';
import { ToastService } from 'src/app/services/shared/toast.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss'],
})
export class NodesComponent implements OnInit {
  nodeForm: FormGroup;
  selectYesNo: DataList[] = [];
  selectService: DataList[] = [];

  // table
  dataToTable: object[];
  structure: object[] = [
    {
      name: 'incidence',
      description: 'Incidente',
      validation: '',
    },
    {
      name: 'nodeAdic',
      description: 'CI',
      validation: '',
    },
    {
      name: 'nodeDuration',
      description: 'Duración',
      validation: '',
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive',
    },
    {
      name: 'anomaliaClassDesc',
      description: 'Observación',
      validation: 'observation',
    },
    {
      name: 'compensatesInt',
      description: 'Internet',
      validation: 'service',
    },
    {
      name: 'compensatesTel',
      description: 'Telefonía',
      validation: 'service',
    },
    {
      name: 'compensatesTv',
      description: 'Telvisión',
      validation: 'service',
    },
  ];
  changeIconVlidation = true;

  constructor(
    private _fb: FormBuilder,
    private _nodesSvc: NodesValidationService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.nodeForm = this._fb.group({
      services: ['', [Validators.required]],
      user: ['test'],
    });
  }

  ngOnInit(): void {}

  invalidFieldForm(fieldName: string) {
    return (
      this.nodeForm.get(fieldName).touched &&
      this.nodeForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(this.nodeForm, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectCompensate)) {
      this.selectYesNo.push({ key: i[1], value: i[0] });
    }
    for (const i of Object.entries(ServicesSettings)) {
      this.selectService.push({ key: i[0], value: i[1] });
    }
    this.initialCharge(); // table
  }

  initialCharge() {
    this._nodesSvc.allNodesValidation().subscribe((resp: any) => {
      this.dataToTable = resp.tblMaximoInc;
    });
  }

  onSubmit() {
    console.log(this.nodeForm.value);

    if (this.nodeForm.invalid) {
      return Object.values(this.nodeForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
    }
  }

  approvedNode(node) {}
  rejectedQualityNode(node) {
    if (node.observations === '') {
      this._toastScv.showError(
        'Debe ingresar un comentario en el campo de observación'
      );
    } else {
      console.log(node);
    }
  }
  rejectedNode(node) {
    if (node.observations === '') {
      this._toastScv.showError(
        'Debe ingresar un comentario en el campo de observación'
      );
    } else {
      console.log(node);
    }
  }

  cleanForm() {
    this.nodeForm.reset({
      currentlyUse: '',
      maintenance: '',
      compensation: '',
    });
  }
}
