import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';

import * as XLSX from 'xlsx';
import {
  BulkLoadRequestModel,
  errorResponse,
  GeneralResponse,
} from '@models/bulk-load';
import { bulkLoadParams } from '../../../libraries/utilities.library';
import { BulkLoadService } from '@services/bulkLoad/bulk-load.service';
import { GeneralFunctionsService } from '@services/general-functions.service';
import { CustomValidation } from '../../../utils/custom-validation';
import { ToastService } from '@shared_services/toast.service';
import { ResponseLoginModel as UserModel } from '@models/users';
import { AuthService } from '@shared_services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { BulkLoadModule } from './bulk-load.module';

@Component({
  selector: 'app-bulk-load',
  templateUrl: './bulk-load.component.html',
  styleUrls: ['./bulk-load.component.scss'],
})
export class BulkLoadComponent implements OnInit {
  bulkLoadForm: FormGroup;
  dataUploaded: any = '';
  dataArraySent: string[];
  fileEncode: string;
  userData: UserModel = null;

  fileBaseData: string;
  fileBaseName = '';
  dataPreview: any = null;
  optListFaults = bulkLoadParams.optionList;
  msgProcessedFiles: string = bulkLoadParams.msgs.processedFiles;
  msgPrevious: string = bulkLoadParams.msgs.previousInformation;
  items: MenuItem[] = [
    {
      label: 'Opciones',
      items: [
        {
          label: 'Actualizar',
          icon: 'pi pi-refresh',
          command: () => {
            // this.updateData();
          },
        },
      ],
    },
  ];
  uploadedFiles: BulkLoadRequestModel[] = null;
  // table
  dataToTable: object[];
  structure: object[];
  dataToTableErrors: object[];
  collapsedOptions: boolean[] = [true, true];
  structureErrors: object[] = [
    {
      name: 'lineNumber',
      description: 'N° de línea',
      validation: '',
    },
    {
      name: 'data',
      description: 'Datos',
      validation: '',
    },
    {
      name: 'errorDescription',
      description: 'Comentario',
      validation: '',
    },
  ];
  sheetOptionsList: object[] = [];
  templateOptionsList: object[] = bulkLoadParams.optionList;
  constructor(
    private _fb: FormBuilder,
    private _bulkLoadSvc: BulkLoadService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService,
    private _confirmationScv: ConfirmationService,
    private _authSvc: AuthService
  ) {
    this.userData = this._authSvc.userData;
    this.createForm();
  }

  createForm() {
    this.bulkLoadForm = this._fb.group({
      uploadFile: [
        '',
        [
          Validators.required,
          CustomValidation.fileIsAllowed(bulkLoadParams.filesAllowed),
        ],
      ],
      uploadType: ['', [Validators.required]],
      user: [this.userData.usuario.usuario],
    });
  }

  ngOnInit(): void {}

  invalidFieldForm(fieldName: string) {
    return (
      this.bulkLoadForm.get(fieldName).touched &&
      this.bulkLoadForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(this.bulkLoadForm, field);
  }

  sendFileToService() {
    const dataRequest = {
      file: this.fileBaseData,
      fileName: this.fileBaseName,
      uploadType: this.bulkLoadForm.get('uploadType').value,
      userName: this._authSvc.userData.usuario.usuario,
    };
    this.createCauseApi(dataRequest);
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
      console.log('jsonData', jsonData);

      this.prepareDataToPreview(jsonData);
    };
    reader.readAsBinaryString(file); // binary read for table
    this.handleFileInput(e); // read as url for base 64
  }

  prepareDataToPreview(data: Object) {
    const sheets = Object.keys(data);
    this.dataPreview = sheets.length > 0 ? data : null;
    this.sheetOptionsList = sheets.map((sheet) => ({
      valueOption: sheet,
      nameOption: sheet,
    }));
    console.log('sheetOptionsList: ', this.sheetOptionsList);
  }

  informationToTable(option) {
    console.log('option: ', option);

    const data: object[] = this.dataPreview[option];
    if (data.length > 0) {
      const items = Object.keys(data[0]);
      this.structure = items.map((item) => ({
        name: item,
        description: item,
        validation: '',
      }));
      this.dataToTable = data;
    }
  }

  downloadTemplate(option) {
    const { path } = this.optListFaults.find(
      (item) => item.valueOption == option
    );
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

  onSubmit() {
    if (this.bulkLoadForm.invalid) {
      return Object.values(this.bulkLoadForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      console.log(this.bulkLoadForm.value);
      this._confirmationScv.confirm({
        message: bulkLoadParams.confirmLoad.msg,
        accept: () => {
          // this.dataToTable = [];
          this.sendFileToService();
        },
        reject: () => {},
      });
    }
  }

  fileSent(responseDataErrors: errorResponse[]) {
    this.dataToTableErrors = responseDataErrors;
    if (responseDataErrors.length > 0) {
      this.scrollDown();
    }
  }

  scrollDown() {
    document
      .getElementById('sentScroll')
      .scrollIntoView({ behavior: 'smooth' });
  }

  createCauseApi(dataRequest: BulkLoadRequestModel) {
    this.collapsedOptions = [true, false];

    this._bulkLoadSvc
      .createBulkLoad(dataRequest)
      .subscribe((resp: GeneralResponse) => {
        if (resp.code === 'SEND-FILE-VALRES-1' || resp.code === '0') {
          this._toastScv.showSuccess(resp.messageCode);
          // this.fileSent();
        } else {
          console.log('Respuesta: ', resp);
          this.fileSent(resp.Errors.Error);
          this._toastScv.showError(resp.descriptionCode);
        }
      });
  }

  cleanForm() {
    this.bulkLoadForm.reset({ uploadType: '' });
    this.fileBaseName = '';
    this.cleanInputFile();
  }
  cleanInputFile() {
    this.bulkLoadForm.controls.uploadFile.setValue('');
    this.fileBaseName = '';
    this.dataPreview = null;
    this.structure = [];
    this.dataToTable = [];
  }
}
