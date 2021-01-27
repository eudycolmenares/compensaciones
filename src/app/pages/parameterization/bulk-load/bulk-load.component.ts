import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  BulkLoadRequestModel,
  errorResponse,
  GeneralResponse,
} from 'src/app/models/bulk-load';
import { BulkLoadService } from '../../../services/bulkLoad/bulk-load.service';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from 'src/app/services/shared/toast.service';

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
  // table
  dataToTable: errorResponse[];
  structure: object[] = [
    {
      name: 'lineNumber',
      description: 'Número de línea',
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
  constructor(
    private _fb: FormBuilder,
    private _bulkLoadSvc: BulkLoadService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
  }

  createForm() {
    this.bulkLoadForm = this._fb.group({
      fileName: ['', [Validators.required]],
      // state: [''],
      uploadFile: [
        '',
        [Validators.required, this.fileExtensionValidator('.csv')],
      ],
      // uploadError: [''],
      uploadType: ['', [Validators.required]],
      user: ['test'],
    });
  }

  fileExtensionValidator(validExt: string) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== null && control.value.substr(-4) === validExt) {
        return null;
      }
      return { fileExtValidator: true };
    };
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
    this.bulkLoadForm
      .get('fileName')
      .setValue(Date.now() + '_' + this.dataUploaded['name']);
    if (this.bulkLoadForm.get('uploadType').value) {
      this.onSubmit();
    }
  }

  downloadModelDocument(selectedTypeFile) {
    const symptomsFile = 'assets/documents/SINTOMAS.csv';
    const causesFile = 'assets/documents/CAUSAS.csv';
    if (selectedTypeFile) {
      let selectFile = symptomsFile;
      if (selectedTypeFile === 'CAUSAS') {
        selectFile = causesFile;
      }

      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        let filename = selectedTypeFile + '.csv';
        link.setAttribute('href', selectFile);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  onSubmit() {
    if (this.bulkLoadForm.invalid) {
      return Object.values(this.bulkLoadForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
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
          userName: 'test', // seteado
        };
        this.createCauseApi(dataRequest);
      };
    }
  }

  createCauseApi(dataRequest: BulkLoadRequestModel) {
    this._bulkLoadSvc
      .createBulkLoad(dataRequest)
      .subscribe((resp: GeneralResponse) => {
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
