import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import {
  BulkLoadRequestModel,
  errorResponse,
  GeneralResponse,
} from '@models/bulk-load';
import { BulkLoadService } from '@services/bulkLoad/bulk-load.service';
import { GeneralFunctionsService } from '@services/general-functions.service';
import { CustomValidation } from '../../../utils/custom-validation';
import { ToastService } from '@shared_services/toast.service';
import { ResponseLoginModel as UserModel } from '@models/users';
import { AuthService } from '@shared_services/auth.service';

import { ConfirmationService } from 'primeng/api';

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
  // table
  dataToTable: errorResponse[];
  structure: object[] = [
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
  templateOptionsList: object[] = [ // acomodar
    { valueOption: 'CAUSAS', nameOption: 'Causas' },
    { valueOption: 'SINTOMAS', nameOption: 'Síntomas' },
  ];
  constructor(
    private _fb: FormBuilder,
    private _bulkLoadSvc: BulkLoadService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService,
    private _confirmationService: ConfirmationService,
    private _authSvc: AuthService,
  ) {
    this.userData = this._authSvc.userData;
    this.createForm();
  }

  createForm() {
    this.bulkLoadForm = this._fb.group({
      fileName: ['', [Validators.required]],
      // state: [''],
      uploadFile: [
        '',
        [Validators.required, CustomValidation.fileIsAllowed('csv')],
      ],
      // uploadError: [''],
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

  fileSent(responseDataErrors: errorResponse[]) {
    this.dataToTable = responseDataErrors;
  }

  fileChange(documentUpload) {
    this.dataUploaded = documentUpload.target.files[0];
    console.log(this.dataUploaded, documentUpload);
    this.bulkLoadForm
      .get('fileName')
      .setValue(Date.now() + '_' + this.dataUploaded['name']);
    if (this.bulkLoadForm.get('uploadType').value) {
      this.onSubmit();
    }
  }

  downloadModelDocument(selectedTypeFile: string) {
    if (selectedTypeFile !== null || selectedTypeFile !== undefined) {
      const symptomsFile = 'assets/documents/SINTOMAS.csv'; // acomodar
      const causesFile = 'assets/documents/CAUSAS.csv'; // acomodar
      let selectFile = '';
      if (selectedTypeFile === 'SINTOMAS') {
        selectFile = symptomsFile;
      }
      if (selectedTypeFile === 'CAUSAS') {
        selectFile = causesFile;
      }

      const link = document.createElement('a');
      let filename = selectedTypeFile + '.csv';
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        setTimeout(function () {
          // <- fix error with dropdown list when click
          link.setAttribute('href', selectFile);
          link.setAttribute('download', filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 10);
      }
    }
  }

  onSubmit() {
    if (this.bulkLoadForm.invalid) {
      return Object.values(this.bulkLoadForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this._confirmationService.confirm({ // acomodar
        message: `Toda la información de Cargue Masivo que contiene el archivo quedará
                registrada en la base de datos.`,
        header: '¿Estás seguro que deseas enviar el archivo?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.dataToTable = [];
          this.sendFileToService();
        },
        reject: () => {
          this.bulkLoadForm.get('uploadType').setValue('');
        },
        key: "confirmBulkLoad"
      });
    }
  }

  sendFileToService() {
    let fileReader = new FileReader();
    fileReader.readAsText(this.dataUploaded);
    fileReader.onload = (e) => {
      let text = fileReader.result.toString();
      this.dataArraySent = text.split('\n');
      let textEncode = btoa(text);
      const dataRequest: BulkLoadRequestModel = {
        fileName: this.bulkLoadForm.get('fileName').value,
        file: textEncode,
        uploadType: this.bulkLoadForm.get('uploadType').value,
        userName: this.userData.usuario.usuario,

      };
      this.createCauseApi(dataRequest);
    };
  }

  createCauseApi(dataRequest: BulkLoadRequestModel) {
    this._bulkLoadSvc
      .createBulkLoad(dataRequest)
      .subscribe((resp: GeneralResponse) => {console.log(resp);

        if (resp.code === 'SEND-FILE-VALRES-1' || resp.code === '0') {
          this._toastScv.showSuccess(resp.messageCode);
          // this.fileSent();
        } else {
          this.fileSent(resp.Errors.Error);
          this._toastScv.showError(resp.descriptionCode);
        }
        this.cleanForm();
      });
  }

  cleanForm() {
    this.bulkLoadForm.reset({ uploadType: '' });
    console.log(this.bulkLoadForm.value);
  }
}
