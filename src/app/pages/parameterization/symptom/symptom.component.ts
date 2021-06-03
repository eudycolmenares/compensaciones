import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SymptomService } from '../../../services/symptom/symptom.service';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/services/auth.service';
import { SelectStatus, ServicesSettings as Services } from '../../../libraries/utilities.library';
import { DataList } from '../../../models/general';
import { requestModel, responseModel, symptomModel, symptomsApiModel } from '../../../models/symptom';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-symptom',
  templateUrl: './symptom.component.html',
  styleUrls: ['./symptom.component.scss']
})

export class SymptomComponent implements OnInit {
  formSymptom: FormGroup;
  actionForm = 'create'; // create, update
  selectStatus: object[] = [];
  services: DataList[] = [];
  // table
  dataToTable: symptomModel[];
  structure: object[] = [
    {
      name: 'symptomCode',
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
    }
  ];
  //download file
  nameRowsExcelEnglish: string[] = [];
  nameRowsExcelSpanish: string[] = [];
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor(
    private fb: FormBuilder,
    private symptomSvc: SymptomService,
    private gnrScv: GeneralFunctionsService,
    private toastScv: ToastService,
    private authSvc: AuthService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
    this.symptomSvc.allSymptoms();
  }

  createForm() {
    this.formSymptom = this.fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', Validators.required],
    })
  }
  get invalidCode() {
    return this.formSymptom.get('code').touched && this.formSymptom.get('code').invalid;
  }
  get invalidDescription() {
    return this.formSymptom.get('description').touched && this.formSymptom.get('description').invalid;
  }
  get invalidState() {
    return this.formSymptom.get('state').touched && this.formSymptom.get('state').invalid;
  }
  get invalidServices() {
    return this.formSymptom.get('services').touched && this.formSymptom.get('services').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrScv.validationFormTextRequired(this.formSymptom, field);
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectStatus.push({ key: i[1], value: i[0] })
    }
    for (const i of Object.entries(Services)) {
      this.services.push({ key: i[0], value: i[1] })
    }
    this.initialCharge(); // table
  }
  initialCharge() {
    this.cleanForm();
    this.symptomSvc.allSymptoms().subscribe((resp: symptomsApiModel) => {
      if (resp.generalResponse.code == '0') {
        this.dataToTable = resp.symptom;
      } else { this.toastScv.showError(resp.generalResponse.messageCode); }
    });
  }

  onSubmit() {
    if (this.formSymptom.invalid) {
      return Object.values(this.formSymptom.controls).forEach(control => {
        control.markAsTouched();
      })
    } else {
      const dataRequest: requestModel = {
        'symptom': {
          'symptomCode': this.formSymptom.get('code').value,
          'description': this.formSymptom.get('description').value,
          'state': this.formSymptom.get('state').value,
          'user': this.authSvc.userData.usuario.usuario,
        }
      }
      if (this.actionForm === 'create') {
        this.createSymptomApi(dataRequest);
      } else {
        dataRequest.symptom.symptomId = this.formSymptom.get('id').value;
        this.updateSymptomApi(dataRequest);
      }
    }
  }
  createSymptomApi(dataRequest: requestModel) {
    this.symptomSvc.createSymptom(dataRequest).subscribe((resp: responseModel) => {
      if (resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode);
        this.initialCharge();
      } else {
        this.toastScv.showError(resp.generalResponse.messageCode);
      }
    })
  }
  updateSymptomApi(dataRequest: requestModel) {
    this.symptomSvc.updateSymptom(dataRequest).subscribe(resp => {
      if (resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode);
        this.initialCharge();
      } else {
        this.toastScv.showError(resp.generalResponse.messageCode);
      }
    })
  }

  updateSymptom(symptom: symptomModel) {
    this.setForm(symptom);
    this.actionForm = 'update';
  }
  setForm(data: symptomModel) {
    this.formSymptom.reset({
      id: data.symptomId,
      code: data.symptomCode,
      description: data.description,
      state: data.state,
    });
  }

  disableSymptom(symptom: symptomModel) {
    const dataRequest: requestModel = {
      symptom: {
        ...symptom,
        state: (symptom.state.toString() === '0') ? '1' : '0'
      }
    };
    this.updateSymptomApi(dataRequest);
  }

  deleteSymptom(symptom: symptomModel) {
    this.symptomSvc.deleteSymptom(symptom.symptomId).subscribe(resp => {
      if (resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode);
        this.initialCharge();
      } else {
        this.toastScv.showError(resp.generalResponse.messageCode);
      }
    })
  }

  downloadDataTable() {
    if (this.dataToTable.length > 0) {

      //

      this.structure.forEach((data: {
        name: string;
        description: string;
        validation: string;
      }) => {
        this.nameRowsExcelSpanish.push(
          this.removeAccents(data.description.toLocaleUpperCase())
        );
        this.nameRowsExcelEnglish.push(data.name);
      });


      //


      this.exportAsExcelFile(this.dataToTable);
    }
  }
  exportAsExcelFile(json: object[]): void {
    const csvContent = json.map((row) => {
      return this.nameRowsExcelEnglish.map((k) => {
        let cell = row[k] === null || row[k] === undefined ? '' : row[k];
        return cell;
      });
    });





    var worksheet = XLSX.utils.json_to_sheet([], {
      header: this.nameRowsExcelSpanish,
    });
    worksheet = XLSX.utils.sheet_add_json(worksheet, csvContent, {
      skipHeader: true,
      origin: 'A2',
    });
    const workbook: XLSX.WorkBook = {
      Sheets: { ['SINTOMAS']: worksheet },
      SheetNames: ['SINTOMAS'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer);
  }
  saveAsExcelFile(buffer: any): void {
    const blob: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(
        blob,
        'sintomas_' + new Date().getTime() + this.EXCEL_EXTENSION
      );
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          'sintomas_' +
          new Date().getTime() +
          this.EXCEL_EXTENSION
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.toastScv.showSuccess('Archivo descargado correctamente');
      }
    }
  }

  removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  cleanForm() {
    this.formSymptom.reset({
      state: '',
    });
    this.actionForm = 'create';
  }
}
