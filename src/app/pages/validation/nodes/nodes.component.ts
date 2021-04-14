import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '@services/general-functions.service';
import { ServicesSettings } from '@libraries/utilities.library';
import { NodesValidationService } from '@services/nodes-validation/nodes-validation.service';
import { DataList } from '@models/general';
import * as models from '@models/nodes-validation';
import { ToastService } from '@shared_services/toast.service';
import { ResponseLoginModel as UserModel } from '@models/users';
import { AuthService } from '@shared_services/auth.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss'],
})
export class NodesComponent implements OnInit {
  nodeForm: FormGroup;
  selectService: DataList[] = [];
  userData: UserModel = null;

  // table
  dataToTable: object[];
  structure: object[] = [
    {
      name: 'incidence',
      description: 'Incidente',
      validation: '',
    },
    {
      name: 'ciPpal',
      description: 'CI',
      validation: '',
    },
    {
      name: 'nodeDuration',
      description: 'Duración',
      validation: 'time-min',
    },
    {
      name: 'state',
      description: 'Estado',
      validation: '',
    },
    {
      name: 'userObservation',
      description: 'Observación',
      validation: 'observation',
    },
    {
      name: 'compensatesInt',
      description: 'Compensa Internet',
      validation: 'yes-no-x',
    },
    {
      name: 'compensatesTel',
      description: 'Compensa TelefonÍa',
      validation: 'yes-no-x',
    },
    {
      name: 'compensatesTv',
      description: 'Compensa Televisión',
      validation: 'yes-no-x',
    },
    {
      name: 'revision',
      description: 'Revisión',
      validation: 'revision',
    },
    {
      name: 'customDateInNode',
      description: 'Fecha inicio incidente',
      validation: '',
    },
    {
      name: 'customDateEndNode',
      description: 'Fecha fin incidente',
      validation: '',
    },
  ];
  changeIconValidation = true;

  constructor(
    private _fb: FormBuilder,
    private _nodesSvc: NodesValidationService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService,
    private _authSvc: AuthService
  ) {
    this.userData = this._authSvc.userData;
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.nodeForm = this._fb.group({
      services: [{ key: 'internet', value: 'Internet' }, [Validators.required]],
      user: [this.userData.usuario.usuario],
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
    for (const i of Object.entries(ServicesSettings)) {
      this.selectService.push({ key: i[0], value: i[1] });
    }

    this.initialCharge();
  }

  initialCharge() {
    this._nodesSvc
      .allApprovedNodes()
      .subscribe(async (resp: models.NodesValidationApiModel) => {
        this.dataToTable = await resp.tblMaximum.filter(
          (data) =>
            (data.srInternet === 1 &&
              this.nodeForm.get('services').value.key === 'internet') ||
            (data.srTv === 1 &&
              this.nodeForm.get('services').value.key === 'television') ||
            (data.srVoz === 1 &&
              this.nodeForm.get('services').value.key === 'telephone')
        );
        this.dataToTable.map((data:models.NodesValidationModel) => {
          if (data.dateInNode) {
          data.customDateInNode = this._gnrScv.formatDate('YYYY-MM-DD', data.dateInNode) + ' ' + data.timeInNode;
          }
          if (data.dateEndNode) {
          data.customDateEndNode = this._gnrScv.formatDate('YYYY-MM-DD', data.dateEndNode) + ' ' + data.timeEndNode;
          }
          return data;
        });

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

  approvedNode(node) {
    let data: models.RequestModel = {
      tblMaximum: {
        ...node,
        revision: 'APROBADO',
      },
    };

    this._nodesSvc
      .updateNodeValidation(data)
      .subscribe((resp: models.ResponseModel) => {
        this.messageToCustomer(resp);
      });
  }

  rejectedQualityNode(node) {
    if (node.userObservation === '' || node.userObservation === undefined) {
      this._toastScv.showError(
        'Debe ingresar un comentario en el campo de observación'
      );
    } else {

      let data: models.RequestModel = {
        tblMaximum: {
          ...node,
          revision: 'RECHAZADO CALIDAD',
        },
      };

      this._nodesSvc
        .updateNodeValidation(data)
        .subscribe((resp: models.ResponseModel) => {
          this.messageToCustomer(resp);
        });
    }
  }

  rejectedNode(node: models.NodesValidationModel) {
    if (node.userObservation === '' || node.userObservation === undefined) {
      this._toastScv.showError(
        'Debe ingresar un comentario en el campo de observación'
      );
    } else {
      let data: models.RequestModel = {
        tblMaximum: {
          ...node,
          revision: 'RECHAZADO',
        },
      };

      this._nodesSvc
        .updateNodeValidation(data)
        .subscribe((resp: models.ResponseModel) => {
          this.messageToCustomer(resp);
        });
    }
  }

  messageToCustomer(resp: models.ResponseModel) {
    if (resp.generalResponse.code === '0') {
      this._toastScv.showSuccess(
        resp.generalResponse.messageCode,
        resp.generalResponse.descriptionCode
      );
      this.initialCharge();
    } else {
      this._toastScv.showError(
        resp.generalResponse.messageCode,
        resp.generalResponse.descriptionCode
      );
    }
  }
}
