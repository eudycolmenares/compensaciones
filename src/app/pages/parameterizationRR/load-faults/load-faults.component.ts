import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../shared/services/toast.service';
import { FaultsService } from '../../../services/faults/faults.service';
import { faultsApiModel } from '../../../models/faults';

// xlsx
import * as XLSX from 'xlsx';

import { ConfirmationService } from 'primeng/api';
import { CustomValidation } from 'src/app/utils/custom-validation';

@Component({
  selector: 'app-load-faults',
  templateUrl: './load-faults.component.html',
  styleUrls: ['./load-faults.component.scss']
})

export class LoadFaultsComponent implements OnInit {
  form: FormGroup;
  fileBaseData: string;
  fileBaseName = '';
  dataPreview: any = null;
  templateOptionsList: object[] = [
    { valueOption: 'RESIDENTIAL', nameOption: 'Residencial' },
    { valueOption: 'BUILDINGS', nameOption: 'Edificios' },
    { valueOption: 'SMES', nameOption: 'Pymes' },
    { valueOption: 'RESIDENTIAL_SETTING', nameOption: 'Ajuste Residencial' },
    { valueOption: 'SME_ADJUSTMENT', nameOption: 'Ajuste Pymes' },
    { valueOption: 'MAINTENANCE_ORDERS', nameOption: 'Órdenes Mantenimiento' },
  ];
  // table
  dataToTable: object[];
  structure: object[] = [];
  sheetOptionsList: object[] = [];

  constructor(
    private fb: FormBuilder,
    private gnrSvc: GeneralFunctionsService,
    private toastScv: ToastService,
    private faultsScv: FaultsService,
    private confirmationSvc: ConfirmationService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      file: ['', [Validators.required, CustomValidation.fileIsAllowed('xlsx')],],
    })
  }

  get invalidType() {
    return this.form.get('type').touched && this.form.get('type').invalid;
  }
  get invalidFile() {
    return this.form.get('file').touched && this.form.get('file').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrSvc.validationFormTextRequired(this.form, field);
  }

  onSubmit() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      this.confirmationSvc.confirm({
        message: `Toda la información de Carga de Fallas que contiene el archivo quedará
                registrada en la base de datos.`,
        accept: () => {
          this.sendFileToService();
        },
        reject: () => { },
      });
    }
  }

  sendFileToService() {
    const dataRequest = {
      'file': this.fileBaseData,
      'fileName': this.fileBaseName,
      'loadType': this.form.get('type').value,
      'userName': 'test', // seteado
    }
    this.faultsScv.loadFaults(dataRequest).subscribe((resp: faultsApiModel) => {
      if(resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.descriptionCode, resp.GeneralResponse.messageCode);
      } else {
        this.toastScv.showError(resp.GeneralResponse.descriptionCode, resp.GeneralResponse.messageCode);
      }
      this.cleanForm();
    })
  }

  handleFileInput(e: Event) {
    this.fileBaseName = e.target['files'][0]['name'];
    let reader = new FileReader();
    reader.readAsDataURL(e.target['files'][0]);
    reader.onload = () => {
      const data = reader.result;
      const fileString = data.toString().split(';base64,');
      this.fileBaseData = fileString[fileString.length -1];
    };
  }

  handlePreviewFileInput(e: Event) {
    const file = e.target['files'][0];
    let reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const workBook = XLSX.read(data, { type: 'binary' });
      const jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.prepareDataToPreview(jsonData);
    };
    reader.readAsBinaryString(file); // binary read for table
    this.handleFileInput(e); // read as url for base 64
  }

  prepareDataToPreview(data: Object) {
    const sheets = Object.keys(data);
    this.dataPreview = (sheets.length > 0) ? data : null;
    this.sheetOptionsList = sheets.map(sheet => ({valueOption: sheet, nameOption: sheet}))
  }

  informationToTable(option) {
    const data: object[] = this.dataPreview[option];
    if(data.length > 0) {
      const items = Object.keys(data[0]);
      this.structure = items.map(item => ({ name:  item, description: item, validation: ''}));
      this.dataToTable = data;
    }
  }

  downloadTemplate(option) {
    let nameFile = '';
    switch (option) {
      case 'RESIDENTIAL':
        nameFile = 'Template-BaseResidencial-FallasRR';
        break;
      case 'BUILDINGS':
        nameFile = 'Template-Edificios-FallasRR';
        break;
      case 'SMES':
        nameFile = 'Template-BasePymes-FallasRR';
        break;
      case 'RESIDENTIAL_SETTING':
        nameFile = 'Template-AjusteResidencial-FallasRR';
        break;
      case 'SME_ADJUSTMENT':
        nameFile = 'Template-AjustesPymes-FallasRR';
        break;
      case 'MAINTENANCE_ORDERS':
        nameFile = 'Template-OrdenesMantenimiento-FallasRR';
        break;
    }

    const fileToDownload = `assets/documents/${nameFile}.xlsx`;
    const link = document.createElement('a');
    if (link.download !== undefined) {
      let filename = `${nameFile}.xlsx`;
      link.setAttribute('href', fileToDownload);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  cleanForm() {
    this.form.reset({
      type: ''
    });
    this.fileBaseName = '';
    this.cleanInputFile()
  }
  cleanInputFile() {
    this.form.controls.file.setValue('');
    this.fileBaseName = '';
    this.dataPreview = null;
    this.structure = [];
    this.dataToTable = [];
  }

}
