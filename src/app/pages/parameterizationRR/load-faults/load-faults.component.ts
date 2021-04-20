import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
// xlsx
import * as XLSX from 'xlsx';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../shared/services/toast.service';
import { FaultsService } from '../../../services/faults/faults.service';
import { AuthService } from '../../../shared/services/auth.service';
import {
  faultsApiModel,
  loadModel
} from '../../../models/faults';
import { CustomValidation } from 'src/app/utils/custom-validation';
import { loadFaultsParams } from '../../../libraries/utilities.library';

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
  optListFaults = loadFaultsParams.optionsList;
  msgProcessedFiles = loadFaultsParams.msgs.processedFiles;
  msgPrevious = loadFaultsParams.msgs.previousInformation;
  items: MenuItem[] = [
    {
      label: 'Opciones',
      items: [{
        label: 'Actualizar',
        icon: 'pi pi-refresh',
        command: () => {
          this.updateData();
        }
      }]
    }
  ];
  uploadedFiles: loadModel[] = null;
  // table
  dataToTable: object[];
  structure: object[] = [];
  sheetOptionsList: object[] = [];

  constructor(
    private fb: FormBuilder,
    public gnrSvc: GeneralFunctionsService,
    private toastScv: ToastService,
    private faultsScv: FaultsService,
    private confirmationSvc: ConfirmationService,
    private authSvc: AuthService
  ) {
    this.initialSetup();
  }

  ngOnInit(): void {
  }

  initialSetup() {
    this.createForm();
    this.updateData();
  }

  updateData() {
    const arrayTypesFaults = loadFaultsParams.optionsList.reduce((pre, current) => [...pre, current.valueOption], []);
    this.faultsScv.readAllFaults().subscribe((resp: faultsApiModel) => {
      if (resp.GeneralResponse.code == '0') {
        this.uploadedFiles = resp.Loads.Load.filter(item => arrayTypesFaults.includes(item.loadType));
        this.compareToSort(this.uploadedFiles);
      } else { this.toastScv.showError(resp.GeneralResponse.descriptionCode, resp.GeneralResponse.messageCode); }
    });
  }
  createForm() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      file: ['', [Validators.required, CustomValidation.fileIsAllowed(['xlsx'])],],
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
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    } else {
      this.confirmationSvc.confirm({
        message: loadFaultsParams.msgs.confirmService,
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
      'userName': this.authSvc.userData.usuario.usuario,
    }
    this.faultsScv.loadFaults(dataRequest).subscribe((resp: faultsApiModel) => {
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.descriptionCode, resp.GeneralResponse.messageCode);
      } else {
        this.toastScv.showError(resp.GeneralResponse.descriptionCode, resp.GeneralResponse.messageCode);
      }
      this.cleanForm();
      this.updateData();
    })
  }

  handleFileInput(e: Event) {
    this.fileBaseName = e.target['files'][0]['name'];
    let reader = new FileReader();
    reader.readAsDataURL(e.target['files'][0]);
    reader.onload = () => {
      const data = reader.result;
      const fileString = data.toString().split(';base64,');
      this.fileBaseData = fileString[fileString.length - 1];
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
    this.sheetOptionsList = sheets.map(sheet => ({ valueOption: sheet, nameOption: sheet }))
  }

  informationToTable(option) {
    const data: object[] = this.dataPreview[option];
    if (data.length > 0) {
      const items = Object.keys(data[0]);
      this.structure = items.map(item => ({ name: item, description: item, validation: '' }));
      this.dataToTable = data;
    }
  }

  downloadTemplate(option) {
    const { path } = this.optListFaults.find(item => item.valueOption == option)
    const link = document.createElement('a');
    if (link.download !== undefined) {
      link.setAttribute('href', path);
      link.setAttribute('download', `${option}.xlsx`);
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
  compareToSort(items: loadModel[]) {
    return items.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
  }
}
