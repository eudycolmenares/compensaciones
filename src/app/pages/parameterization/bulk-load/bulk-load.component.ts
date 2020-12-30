import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { BulkLoadApiModel, BulkLoadModel, RequestModel, ResponseModel } from 'src/app/models/bulk-load';
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
  fileEncode: string;
  // table
  dataToTable: BulkLoadModel[];
  structure: object[] = [
    {
      name: 'Disruption',
      subname: 'id',
      description: 'Código Anolamía',
      validation: 'object',
    },
    {
      name: 'Disruption',
      subname: 'description',
      description: 'Descripción Anolamía',
      validation: 'object',
    },
    {
      name: 'Problem',
      subname: 'id',
      description: 'Código Problema',
      validation: 'object',
    },
    {
      name: 'Problem',
      subname: 'description',
      description: 'Descripción Problema',
      validation: 'object',
    },
    {
      name: 'code',
      description: 'Código Causa',
      validation: '',
    },
    {
      name: 'description',
      description: 'Descripción Causa',
      validation: '',
    },
    {
      name: 'Origin',
      subname: 'id',
      description: 'Origen',
      validation: 'object',
    },
    {
      name: 'OriginType',
      subname: 'id',
      description: 'Tipo Origen',
      validation: 'object',
    },
    {
      name: 'internet',
      description: 'Internet',
      validation: 'service',
    },
    {
      name: 'telephone',
      description: 'Telefonía',
      validation: 'service',
    },
    {
      name: 'television',
      description: 'Televisión',
      validation: 'service',
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive',
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
      // fileName: [''],
      // state: [''],
      uploadFile: [
        '',
        [Validators.required, this.fileExtensionValidator('.csv')],
      ],
      // uploadError: [''],
      uploadType: ['', [Validators.required]],
      // user: [''],
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
      .allBulkLoad('SINTOMAS')
      .subscribe((resp: BulkLoadApiModel) => {
        this.dataToTable = resp.compProcessLoad;
        console.log(this.dataToTable);
        console.log(atob(this.dataToTable[1].file));
      });
  }

  fileChange(documentUpload) {
    this.dataUploaded = documentUpload.target.files[0];
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
        let text = fileReader.result;
        let textEncode = btoa(text.toString());
        console.log(textEncode);
        const dataRequest: BulkLoadModel = {
            fileName: 'test.csv',
            file: textEncode,
            uploadType: this.bulkLoadForm.get('uploadType').value,
            userName: 'test', // seteado
        };
        this.createCauseApi(dataRequest);
        
      };
      
    }
  }

  createCauseApi(dataRequest: BulkLoadModel) {
    this._bulkLoadSvc.createBulkLoad(dataRequest).subscribe((resp: ResponseModel) => {
      console.log(resp);
      
      if (resp.GeneralResponse.code === '0') {
        this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
        this.cleanForm();
      } else {
        this._toastScv.showError(resp.GeneralResponse.messageCode);
      }
    });
  }

  cleanForm() {
    this.bulkLoadForm.reset();
    this.bulkLoadForm.get('uploadType').setValue('');
  }
}
