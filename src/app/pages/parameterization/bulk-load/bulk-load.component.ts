import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  BulkLoadApiModel,
  BulkLoadRequestModel,
  BulkLoadResponseModel,
  BulkLoadErrorModel,
  GeneralResponse,
} from 'src/app/models/bulk-load';
import { BulkLoadService } from '../../../services/bulkLoad/bulk-load.service';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { DataList } from '../../../models/general';
import { ToastService } from 'src/app/services/shared/toast.service';

@Component({
  selector: 'app-bulk-load',
  templateUrl: './bulk-load.component.html',
  styleUrls: ['./bulk-load.component.scss'],
})
export class BulkLoadComponent implements OnInit {
  bulkLoadForm: FormGroup;
  dataUploaded: Blob;
  dataArraySent: string[];
  fileEncode: string;
  // table
  dataToTable: BulkLoadErrorModel[];
  structure: object[] = [
    {
      name: 'lineError',
      description: 'Número de línea',
      validation: '',
    },
    {
      name: 'dataError',
      description: 'Datos',
      validation: '',
    },
    {
      name: 'commentError',
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
      fileName: [''],
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

  fileSent() {
    this._bulkLoadSvc
      .allBulkLoad(this.bulkLoadForm.get('uploadType').value)
      .subscribe((resp: BulkLoadApiModel) => {
        var fileName = this.bulkLoadForm.get('fileName').value;
        var user = this.bulkLoadForm.get('user').value;

        resp.compProcessLoad = resp.compProcessLoad.filter(function (data) {
          return (
            data.fileName === fileName &&
            data.user === user &&
            data.state === 'FINALIZADO_CON_ERRORES'
          );
        });

        if (resp.compProcessLoad) {
          let dataFiltered = atob(resp.compProcessLoad[0].uploadError).split(
            '\n'
          );
          dataFiltered.pop();
          var arrayList: BulkLoadErrorModel[] = [];
          dataFiltered.forEach((data: any) => {
            let dataLineError = data.split(' El ')[0];
            let numberLineError =
              Number(dataLineError.replace('Linea: ', '')) - 1;
            arrayList.push({
              lineError: dataLineError,
              dataError: this.dataArraySent[numberLineError],
              commentError: data.split(' El ')[1],
            });
          });
          this.dataToTable = arrayList;
        }
      });
  }

  fileChange(documentUpload) {
    this.dataUploaded = documentUpload.target.files[0];
    this.bulkLoadForm
      .get('fileName')
      .setValue(Date.now() + '_' + this.dataUploaded['name']);
  }

  downloadModelDocument() {
    const symptomsFile = 'assets/documents/SINTOMAS.csv';
    const causesFile = 'assets/documents/CAUSAS.csv';
    if (this.bulkLoadForm.get('uploadType').value) {
      let selectFile = symptomsFile;
      if (this.bulkLoadForm.get('uploadType').value === 'CAUSAS') {
        selectFile = causesFile;
      }
      window.open(selectFile, '_self');
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
          this.fileSent();
          // this.cleanForm();
        } else {
          this._toastScv.showError(
            resp.messageCode + ', ' + resp.descriptionCode
          );
        }
      });
  }

  cleanForm() {
    this.bulkLoadForm.reset();
    this.bulkLoadForm.get('uploadType').setValue('');
  }
}
