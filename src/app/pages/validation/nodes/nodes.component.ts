import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '@services/general-functions.service';
import { NodesValidationService } from '@services/nodes-validation/nodes-validation.service';
import * as models from '@models/nodes-validation';
import { DataList } from '@models/general';
import { ToastService } from '@shared_services/toast.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss'],
})
export class NodesComponent implements OnInit {
  nodeForm: FormGroup;
  nodeRevisionForm: FormGroup;
  selectService_Node: DataList[];
  selectRevision_Node: DataList[];
  nameTableSelected_download: string = '';
  selectedRevisionButtons:string[] = [];

  // table
  dataToTable: object[];
  structure: {
    name: string;
    description: string;
    validation: string;
}[] = [
    {
      name: 'incidence',
      description: 'Incidente',
      validation: '',
    },
    {
      name: 'ciPpal',
      description: 'CI Principal',
      validation: '',
    },
    {
      name: 'nodeAdic',
      description: 'CI Adicional',
      validation: '',
    },
    {
      name: 'durationFormat',
      description: 'Duración',
      validation: '',
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
      name: 'originType',
      description: 'Tipo origen',
      validation: '',
    },
    {
      name: 'revision',
      description: 'Revisión',
      validation: '',
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
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.nodeForm = this._fb.group({
      listNodes_Revision: [
        { key: 'approved'},
        [Validators.required],
      ],
    });

    this.nodeRevisionForm = this._fb.group({
      filterRevision: [
        { key: 'all'},
        [Validators.required],
      ],
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
    this.selectService_Node = [
      { key: 'approved', value: 'Candidatos' },
      { key: 'rejected', value: 'Rechazado - data invalida' },
    ];

    this.selectRevision_Node = [
      { key: 'all', value: 'Todos los registros' },
      { key: 'APROBADO', value: 'Revisión - Aprobado' },
      { key: 'RECHAZADO', value: 'Revisión - Rechazado' },
      { key: 'RECHAZADO CALIDAD', value: 'Revisión - Rechazado Calidad' },
    ]

    this.initialCharge();
  }

  initialCharge() {
    if (this.nodeForm.get('listNodes_Revision').value.key === 'approved') {
      this.structure[10].validation = 'revision-approved';
      this._nodesSvc
        .allApprovedNodes()
        .subscribe((resp: models.NodesValidationApiModel) => {
          this.dataToTable = this.parseDateDataToTable(resp.tblMaximum);
        });
        this.nameTableSelected_download = 'nodos_aprovados';
        this.selectedRevisionButtons = ['edit', 'disable', 'delete'];
    }

    if (this.nodeForm.get('listNodes_Revision').value.key === 'rejected') {
      this.structure[10].validation = 'revision-rejected';
      this._nodesSvc
        .allrejectedForQualityNodes()
        .subscribe((resp: models.NodesValidationApiModel) => {
          this.dataToTable = this.parseDateDataToTable(resp.tblMaximum);
        });
      this.nameTableSelected_download = 'nodos_rechazados';
      this.selectedRevisionButtons = ['', 'disable', 'delete'];
    }
  }

  filterRevisionData () {
    // if (this.nodeRevisionForm.get('filterRevision').value.key === 'all') {
    //   this.dataToTableFilter = this.dataToTable;
    // }else {

    // }
    // this.dataToTable = this.dataToTable.filter( (data: models.NodesValidationModel) => {
    //   data.revision === this.nodeRevisionForm.get('filterRevision').value.key
    // } )
  }

  parseDateDataToTable(dataReceived) {
    return dataReceived.map((data: models.NodesValidationModel) => {
      if (data.dateInNode) {
        data.customDateInNode =
          this._gnrScv.formatDate('YYYY-MM-DD', data.dateInNode) +
          ' ' +
          data.timeInNode;
      }
      if (data.dateEndNode) {
        data.customDateEndNode =
          this._gnrScv.formatDate('YYYY-MM-DD', data.dateEndNode) +
          ' ' +
          data.timeEndNode;
      }
      return data;
    });
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

  downloadDataTable() {
    if (this.dataToTable.length > 0) {
      this.exportToCsv(this.dataToTable);
    }
  }

  exportToCsv(rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }

    const separator = '|';
    const keys = ['incidence', 'ciPpal', 'durationFormat', 'state', 'userObservation', 'compensatesInt', 'compensatesTel', 'compensatesTv', 'originType', 'revision', 'customDateInNode', 'customDateEndNode'];
    const keysSpanish = ['Incidente', 'CI', 'Duración', 'Estado', 'Observación', 'Compensa Internet', 'Compensa TelefonÍa', 'Compensa Televisión', 'Tipo origen', 'Revisión', 'Fecha inicio incidente', 'Fecha fin incidente'];
    const csvContent =
      keysSpanish.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell.toLocaleString();
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, this.nameTableSelected_download + '.csv');
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', this.nameTableSelected_download + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this._toastScv.showSuccess('Archivo descargado correctamente');
      }
    }
  }
}
