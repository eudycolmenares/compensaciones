import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import {
  RRServicesFailure,
  ServicesSettings,
} from '../../../libraries/utilities.library';
import { DataList } from '../../../models/general';
import { ToastService } from 'src/app/services/shared/toast.service';
import { FailureValidationService } from 'src/app/services/failureValidation/failure-validation.service';
import * as models from '../../../models/failure-validation';

@Component({
  selector: 'app-rr-failure-validation',
  templateUrl: './rr-failure-validation.component.html',
  styleUrls: ['./rr-failure-validation.component.scss'],
})
export class RrFailureValidationComponent implements OnInit {
  rrFailureForm: FormGroup;
  selectTable: DataList[] = [];
  selectService: DataList[] = [];

  // table
  dataToTable: object[];
  structure: object[] = [];
  columNames: object[] = [];

  constructor(
    private _fb: FormBuilder,
    private _failureValidationScv: FailureValidationService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.rrFailureForm = this._fb.group({
      tableOptions: ['', [Validators.required]],
    });
    this.rrFailureForm
      .get('tableOptions')
      .valueChanges.subscribe((selectValue) => {
        this.selectedTableRrFailure(selectValue);
      });
  }

  ngOnInit(): void {}

  invalidFieldForm(fieldName: string) {
    return (
      this.rrFailureForm.get(fieldName).touched &&
      this.rrFailureForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(this.rrFailureForm, field);
  }

  initializeVariables() {
    for (const i of Object.entries(RRServicesFailure)) {
      this.selectTable.push({ key: i[0], value: i[1] });
    }
    for (const i of Object.entries(ServicesSettings)) {
      this.selectService.push({ key: i[0], value: i[1] });
    }
    this.initialCharge(); // table
  }

  initialCharge() {}

  selectedTableRrFailure(selectTable) {

    switch (selectTable) {
      case 'by_nodo_4296_Tel_Int_48h':
        this.structure = this._failureValidationScv.structureIntTelNodes48H();
        this._failureValidationScv
          .allIntTelNodes48H()
          .subscribe((resp: models.IntTelNodes48HApiModel) => {
            this.dataToTable = resp.IntTelNodes48H.IntTelNode48H;
          });
        this.columNames = this._failureValidationScv.columNamesIntTelNodes48H();
        break;

      case 'by_nodo_acuer11_2006_TV16H':
        this.structure = this._failureValidationScv.structureTvNodes16H();
        this._failureValidationScv
          .allTvNodes16H()
          .subscribe((resp: models.TvNodes16HApiModel) => {
            this.dataToTable = resp.TvNodes16H.TvNode16H;
          });
        break;

      case 'compens_arreglo_TV16H':
        this.structure = this._failureValidationScv.structureTvSettings16H();
        this._failureValidationScv
          .allTvSettings16H()
          .subscribe((resp: models.TvSettings16HApiModel) => {
            this.dataToTable = resp.TvSettings16H.TvSetting16H;
          });
        break;

      case 'compens_arreglos_telef_48H':
        this.structure = this._failureValidationScv.structureTelepSettlemCompensas();
        this._failureValidationScv
          .allTelepSettlemCompensas()
          .subscribe((resp: models.TelepSettlemCompensasApiModel) => {
            this.dataToTable =
              resp.TblArrangementTelInt48h.TblArrangementTelInt48h;
          });
        break;

      case 'compes_telef_48H':
        this.structure = this._failureValidationScv.structureTelepCompensas();
        this._failureValidationScv
          .allTelepCompensas()
          .subscribe((resp: models.TelepCompensasApiModel) => {
            this.dataToTable = resp.TblCompesTelInt48h.TblCompesTelInt48h;
          });
        break;

      case 'compes_TV_16H':
        this.structure = this._failureValidationScv.structureTelevCompensas();
        this._failureValidationScv
          .allTelevCompensas()
          .subscribe((resp: models.TelevCompensasApiModel) => {
            this.dataToTable = resp.TblCompesTv16h.TblCompesTv16h;
          });
        break;

      case 'improcedencia_falla_masiva':
        this.structure = this._failureValidationScv.structureMassImproperFailures();
        this._failureValidationScv
          .allMassImproperFailures()
          .subscribe((resp: models.MassImproperFailuresApiModel) => {
            this.dataToTable =
              resp.TblImprocedureCompensation.TblImprocedureCompensation;
          });
        break;

      default:
        break;
    }
  }

  downloadDataTable() {
    if (this.dataToTable.length > 0) {
      this.exportToCsv('myCsvDocumentName.csv', this.dataToTable);
    }
  }

  cleanForm() {
    this.rrFailureForm.reset({
      services: '',
    });
  }

  exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    console.log(this.columNames);
    
    const separator = '|';
    const keys = this.columNames[0]['english'];
    const keysSpanish = this.columNames[1]['spanish'];
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
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
    this._toastScv.showSuccess('Archivo descargado correctamente');
  }
}
