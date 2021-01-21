import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import {
  RRServicesFailure,
  ServicesSettings,
} from '../../../libraries/utilities.library';
import { MaintenanceOrdersCausesService } from 'src/app/services/maintenanceOrdersCauses/maintenance-orders-causes.service';
import { DataList } from '../../../models/general';
import { ToastService } from 'src/app/services/shared/toast.service';

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

  constructor(
    private _fb: FormBuilder,
    private _rrFailureSvc: MaintenanceOrdersCausesService,
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
    console.log(selectTable);

    switch (selectTable) {
      case 'by_nodo_4296_Tel_Int_48h':
      case 'by_nodo_acuer11_2006_TV16H':
        this.structure = [
          {
            name: 'incident',
            description: 'Incidente',
            validation: '',
          },
          {
            name: 'node',
            description: 'Nodo',
            validation: '',
          },
          {
            name: 'cause',
            description: 'Causa',
            validation: '',
          },
          {
            name: 'time',
            description: 'Tiempo',
            validation: '',
          },
          {
            name: 'service',
            description: 'Servicio',
            validation: '',
          },
        ];
        if (selectTable == 'by_nodo_4296_Tel_Int_48h') {
          setTimeout(() => {
            this.dataToTable = [
              {
                incident: 'test 1',
                node: 123,
                cause: 'test',
                time: '10-12-2020',
                service: 'television',
              },
              {
                incident: 'test 2',
                node: 234,
                cause: 'test',
                time: '13-12-2020',
                service: 'telefonia',
              },
            ];
            console.log('funciona');
          });
        }
        if (selectTable === 'by_nodo_acuer11_2006_TV16H') {
        }
        break;
      case 'compens_arreglo_TV16H':
      case 'compens_arreglos_telef_48H':
        this.structure = [
          {
            name: 'account',
            description: 'Cuenta',
            validation: '',
          },
          {
            name: 'call',
            description: 'Llamada',
            validation: '',
          },
          {
            name: 'time',
            description: 'Tiempo',
            validation: '',
          },
          {
            name: 'service',
            description: 'Servicio',
            validation: '',
          },
        ];
        break;
      case 'compes_telef_48H':
      case 'compes_TV_16H':
      case 'improcedencia_falla_masiva':
        this.structure = [
          {
            name: 'account',
            description: 'Cuenta',
            validation: '',
          },
          {
            name: 'incident',
            description: 'Incidente',
            validation: '',
          },
          {
            name: 'service',
            description: 'Servicio',
            validation: '',
          },
          {
            name: 'time',
            description: 'Tiempo',
            validation: '',
          },
        ];
        break;

      default:
        break;
    }
  }

  downloadDataTable() {
    if (this.dataToTable.length > 0) {
      this.exportToCsv('myCsvDocumentName.csv', this.dataToTable);
    }
    this._toastScv.showSuccess('Archivo descargado correctamente');
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
    const separator = '|';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
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
  }
}
