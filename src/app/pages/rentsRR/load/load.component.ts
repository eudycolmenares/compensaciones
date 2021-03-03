import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { FaultsService } from '../../../services/faults/faults.service';
import { CustomValidation } from 'src/app/utils/custom-validation';
import { faultsApiModel } from '../../../models/faults';
import { ToastService } from '../../../shared/services/toast.service';
@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})

export class LoadComponent implements OnInit {
  form: FormGroup;
  fileBaseData: string;
  fileBaseName = '';
  structureToTable: object[] = [];
  dataToTable = [];
  arrayNodes = ['DDCRTD', 'DDACCT', 'ESTRATO', 'TARIFA', 'DDSERV', 'DDDESC', 'GRUPO', 'SUBGRUP', 'DDAMT$', 'NODO'];
  arrayAccounts = ['DDCRTD', 'DDACCT', 'ESTRATO', 'TARIFA', 'DDSERV', 'DDDESC', 'GRUPO', 'SUBGRUP', 'DDAMT$'];
  selectOptionsList: object[] = [{valueOption: 'NODES_RENT', nameOption: 'Nodos'}, {valueOption: 'ACCOUNT_RENT', nameOption: 'Cuentas'}] ;

  constructor(
    private fb: FormBuilder,
    private confirmationSvc: ConfirmationService,
    private gnrSvc: GeneralFunctionsService,
    private faultsScv: FaultsService,
    private toastScv: ToastService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      file: ['', [Validators.required, CustomValidation.fileIsAllowed('txt')],],
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

  handlePreviewFileInput(e: Event) {
    const filesCsv: FileList = e.target['files'];
    if (!this.form.invalid) {
      const lector = new FileReader();
      lector.onload = (e) => {
        const content = e.target.result;
        const contentLines = (content as string).split(/\r?\n/);
        let structure = null;
        switch (this.form.get('type').value) {
          case 'NODES_RENT':
            structure = this.arrayNodes.map(item => ({ name:  item, description: item, validation: ''}));
            this.structureDataTable(contentLines, structure);
            break;
          case 'ACCOUNT_RENT':
            structure = this.arrayAccounts.map(item => ({ name:  item, description: item, validation: ''}));
            this.structureDataTable(contentLines, structure);
            break;
        }
      };
      lector.readAsText(filesCsv[0]); // read as text for table
      this.handleFileInput(e); // read as url for base 64
    }
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

  structureDataTable(contentLines: string[], structure: object[]) {
    this.structureToTable = [];
    this.dataToTable = [];
    for (const i of contentLines) {
      const lineSegmented = i.split(/\t/);
      const newObj = {};
      for (let index = 0; index < structure.length; index++) {
        const ele = structure[index];
        newObj[ele['name']] = lineSegmented[index];
      }
      this.dataToTable.push(newObj);
    }
    this.structureToTable = structure;
  }

  onSubmit() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      this.confirmationSvc.confirm({
        message: `Toda la información de Carga de Fallas que contiene el archivo quedará registrada en la base de datos.`,
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
    this.structureToTable = [];
    this.dataToTable = [];
  }
}
