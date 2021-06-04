import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '@services/general-functions.service';
import { NodesValidationService } from '@services/nodes-validation/nodes-validation.service';
import { NewCauseService } from '@services/newCause/new-cause.service';
import { NewSymptomService } from '@services/newSymptom/new-symptom.service';
import * as models from '@models/nodes-validation';
import * as modelsNewCauses from '@models/new-cause';
import * as modelsNewSymtoms from '@models/new-symptom';
import { DataList } from '@models/general';
import { ToastService } from '@shared_services/toast.service';
import { ObservationService } from '@services/observation/observation.service';
import { ObservationModel } from '@models/observation';

import * as XLSX from 'xlsx';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

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
  selectedRevisionButtons: string[] = [];

  // table
  dataToTable: object[];
  dataToTableFilter: object[];
  structure: {
    name: string;
    description: string;
    validation: string;
  }[] = [];
  changeIconValidation = true;
  listObservation: ObservationModel[];
  SheetNameInExcel: string = '';
  dataCount_aprroved: {
    nameTable: string;
    amountData: number;
    percentage: number;
    activeField: boolean;
  }[] = [
    {
      nameTable: 'Cantidad total de candidatos',
      amountData: 0,
      percentage: 0,
      activeField: true,
    },
    {
      nameTable: 'Aprobados (Revisión)',
      amountData: 0,
      percentage: 0,
      activeField: false,
    },
    {
      nameTable: 'Rechazados (Revisión)',
      amountData: 0,
      percentage: 0,
      activeField: false,
    },
    {
      nameTable: 'Candidatos (A Revisión)',
      amountData: 0,
      percentage: 0,
      activeField: false,
    },
  ];

  dataCount_invalidData: {
    nameTable: string;
    amountData: number;
    percentage: number;
    activeField: boolean;
  }[] = [
    {
      nameTable: 'Cantidad total de datos invalidos',
      amountData: 0,
      percentage: 0,
      activeField: false,
    },
  ];

  dataCount_newCauses: {
    nameTable: string;
    amountData: number;
    percentage: number;
    activeField: boolean;
  }[] = [
    {
      nameTable: 'Cantidad total de causas nuevas',
      amountData: 0,
      percentage: 0,
      activeField: false,
    },
  ];

  dataCount_newSymptoms: {
    nameTable: string;
    amountData: number;
    percentage: number;
    activeField: boolean;
  }[] = [
    {
      nameTable: 'Cantidad total de sintomas nuevos',
      amountData: 0,
      percentage: 0,
      activeField: false,
    },
  ];

  dataCount: {
    nameTable: string;
    amountData: number;
    percentage: number;
    activeField: boolean;
  }[] = [];

  constructor(
    private _fb: FormBuilder,
    private _nodesSvc: NodesValidationService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService,
    private _ObservationSvc: ObservationService,
    private _newCauseSvc: NewCauseService,
    private _newSymptomSvc: NewSymptomService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.nodeForm = this._fb.group({
      listNodes_Revision: [{ key: 'approved' }, [Validators.required]],
    });

    this.nodeRevisionForm = this._fb.group({
      filterRevision: [{ key: 'ALL' }, [Validators.required]],
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
    this._ObservationSvc.allObservation().subscribe((resp) => {
      if (resp.GeneralResponse.code == '0') {
        this.listObservation = resp.ObservationsToValidate.ObservationToValidate.filter(
          (data) => data.state === 1
        );
      }
    });

    this.selectService_Node = [
      { key: 'approved', value: 'Candidatos' },
      { key: 'rejected', value: 'Data invalida' },
      { key: 'newCause', value: 'Causas nuevas' },
      { key: 'newSymptom', value: 'Síntomas nuevos' },
    ];

    this.selectRevision_Node = [
      { key: 'ALL', value: 'Todos los registros' },
      { key: 'APROBADO', value: 'Revisión - Aprobado' },
      { key: 'RECHAZADO', value: 'Revisión - Rechazado' },
      { key: '', value: 'Revisión - Candidato' },
    ];

    this.initialCharge();
  }

  initialCharge() {
    this.dataCount = [...this.dataCount_aprroved];
    this.structure = [];

    if (this.nodeForm.get('listNodes_Revision').value.key === 'approved') {
      this.structure = [
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
          validation: 'revision-approved',
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
      this._nodesSvc
        .allApprovedNodes()
        .subscribe((resp: models.NodesValidationApiModel) => {
          this.dataToTable = this.parseDateDataToTable(resp.tblMaximum);

          this.filterRevisionData(
            this.nodeRevisionForm.get('filterRevision').value.key
          );
          this.dataCount_aprroved[0].amountData = this.dataToTable.length;
          this.dataCount_aprroved[1].amountData = this.dataToTable.filter(
            (data: models.NodesValidationModel) => data.revision === 'APROBADO'
          ).length;
          this.dataCount_aprroved[2].amountData = this.dataToTable.filter(
            (data: models.NodesValidationModel) => data.revision === 'RECHAZADO'
          ).length;
          this.dataCount_aprroved[3].amountData = this.dataToTable.filter(
            (data: models.NodesValidationModel) =>
              data.revision === '' ||
              data.revision === undefined ||
              data.revision === null
          ).length;
          this.dataCount_aprroved.map((data) => {
            data.percentage = this.formatDecimal(
              (data.amountData * 100) / this.dataCount_aprroved[0].amountData,
              3
            );
          });
          this.dataCount = [...this.dataCount_aprroved];
        });
      this.SheetNameInExcel = 'NODOS CANDIDATOS';
      this.selectedRevisionButtons = ['edit', '', 'delete'];
    }

    if (this.nodeForm.get('listNodes_Revision').value.key === 'rejected') {
      this.structure = this.structure = [
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
          name: 'revision',
          description: 'Revisión',
          validation: 'revision-rejected',
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
      this._nodesSvc
        .allrejectedForQualityNodes()
        .subscribe((resp: models.NodesValidationApiModel) => {
          this.dataToTable = this.parseDateDataToTable(resp.tblMaximum);
          this.dataCount_invalidData.map((data) => {
            data.amountData = this.dataToTable.length;
            data.percentage = this.formatDecimal(
              (data.amountData * 100) / data.amountData,
              3
            );
          });
          this.dataCount = [...this.dataCount_invalidData];
        });
        this.SheetNameInExcel = 'DATA INVALIDA';
      this.selectedRevisionButtons = [];
    }

    if (this.nodeForm.get('listNodes_Revision').value.key === 'newCause') {
      this._newCauseSvc
        .runNewCauses()
        .subscribe((resp: modelsNewCauses.ResponseModel) => {
          if (resp.GeneralResponse.code == '0') {
            this.structure = [
              {
                name: 'causeCode',
                description: 'Código Causa',
                validation: '',
              },
              {
                name: 'problemCode',
                description: 'Código Problema',
                validation: '',
              },
              {
                name: 'failureCode',
                description: 'Código Falla',
                validation: '',
              },
              {
                name: 'state',
                description: 'Estado',
                validation: 'active-desactive',
              },
            ];
            this._newCauseSvc
              .allNewCauses()
              .subscribe((resp: modelsNewCauses.NewCausesApiModel) => {
                this.dataToTable = resp.NewCauses.NewCause;
                this.dataCount_newCauses.map((data) => {
                  data.amountData = this.dataToTable.length;
                  data.percentage = this.formatDecimal(
                    (data.amountData * 100) / data.amountData,
                    3
                  );
                });
                this.dataCount = [...this.dataCount_newCauses];
              });
            this.SheetNameInExcel = 'CAUSAS NUEVAS';
            this.selectedRevisionButtons = [];
          } else {
            this._toastScv.showError(
              resp.GeneralResponse.messageCode,
              resp.GeneralResponse.descriptionCode
            );
          }
        });
    }

    if (this.nodeForm.get('listNodes_Revision').value.key === 'newSymptom') {
      this._newSymptomSvc
        .runNewSymptoms()
        .subscribe((resp: modelsNewSymtoms.ResponseModel) => {
          if (resp.GeneralResponse.code == '0') {
            this.structure = [
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
                validation: 'active-desactive',
              },
            ];
            this._newSymptomSvc
              .allNewSymptoms()
              .subscribe((resp: modelsNewSymtoms.NewSymptomsApiModel) => {
                this.dataToTable = resp.NewSymptoms.NewSymptom;
                this.dataCount_newSymptoms.map((data) => {
                  data.amountData = this.dataToTable.length;
                  data.percentage = this.formatDecimal(
                    (data.amountData * 100) / data.amountData,
                    3
                  );
                });
                this.dataCount = [...this.dataCount_newSymptoms];
              });
              this.SheetNameInExcel = 'SINTOMAS NUEVOS';
            this.selectedRevisionButtons = [];
          } else {
            this._toastScv.showError(
              resp.GeneralResponse.messageCode,
              resp.GeneralResponse.descriptionCode
            );
          }
        });
    }
  }

  formatDecimal(x, posiciones = 0) {
    var isNeg = x < 0;
    var decimal = x % 1;
    var entera = isNeg ? Math.ceil(x) : Math.floor(x);
    var decimalFormated = Math.floor(
      Math.abs(decimal) * Math.pow(10, posiciones)
    );
    var finalNum =
      entera + (decimalFormated / Math.pow(10, posiciones)) * (isNeg ? -1 : 1);

    return finalNum;
  }

  filterRevisionData(dataFilterOption) {
    if (dataFilterOption === 'ALL') {
      this.dataToTableFilter = this.dataToTable;
      this.selectColorCard(0);
    } else if (dataFilterOption === 'APROBADO') {
      this.dataToTableFilter = this.dataToTable.filter(
        (data) => data['revision'] === dataFilterOption
      );
      this.selectColorCard(1);
    } else if (dataFilterOption === 'RECHAZADO') {
      this.dataToTableFilter = this.dataToTable.filter(
        (data) => data['revision'] === dataFilterOption
      );
      this.selectColorCard(2);
    } else {
      this.dataToTableFilter = this.dataToTable.filter(
        (data) =>
          data['revision'] === dataFilterOption ||
          data['revision'] === undefined
      );
      this.selectColorCard(3);
    }
  }

  selectColorCard(index: number) {
    this.dataCount.map((data) => {
      data.activeField = false;
    });
    this.dataCount[index].activeField = true;
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
      this._gnrScv.exportDataToExcelFile(
        this.structure,
        this.dataToTable,
        this.SheetNameInExcel
      );
    }
  }
}
