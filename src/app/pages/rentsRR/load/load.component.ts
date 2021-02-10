import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { CustomValidation } from 'src/app/utils/custom-validation';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})

export class LoadComponent implements OnInit {
  // @ViewChild('inputFileTxt') inputForTxt: ElementRef;
  form: FormGroup;
  fileBaseName = '';
  // fileBaseLines = null;
  structureToTable: object[] = [];
  dataToTable = [];
  arrayNodes = ['DDCRTD', 'DDACCT', 'ESTRATO', 'TARIFA', 'DDSERV', 'DDDESC', 'GRUPO', 'SUBGRUP', 'DDAMT$', 'NODO'];
  arrayAccounts = ['DDCRTD', 'DDACCT', 'ESTRATO', 'TARIFA', 'DDSERV', 'DDDESC', 'GRUPO', 'SUBGRUP', 'DDAMT$'];
  selectOptionsList: object[] = [{valueOption: 'nodes', nameOption: 'Nodos'}, {valueOption: 'accounts', nameOption: 'Cuentas'}] ;

  constructor(
    private fb: FormBuilder,
    private confirmationSvc: ConfirmationService,
    private gnrSvc: GeneralFunctionsService,
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

  handleFileInput(e: Event) {
    console.log('handleFileInput()');
    this.fileBaseName = e.target['files'][0]['name'];
    const filesCsv: FileList = e.target['files'];
    if (!this.form.invalid) {
      const lector = new FileReader();
      lector.onload = (e) => {
        const content = e.target.result;
        const contentLines = (content as string).split(/\r?\n/);


        console.log('AHORA SI MOSTRAR LA TABLA');
        let structure = null;
        switch (this.form.get('type').value) {
          case 'nodes':
            console.log('nodes!!!');
            structure = this.arrayNodes.map(item => ({ name:  item, description: item, validation: ''}));
            this.structureDataTable(contentLines, structure);
            break;
          case 'accounts':
            console.log('accounts!!!');
            structure = this.arrayAccounts.map(item => ({ name:  item, description: item, validation: ''}));
            this.structureDataTable(contentLines, structure);
            break;
        }


      };
      lector.readAsText(filesCsv[0]);
      // this.inputForTxt.nativeElement.value = '';
    }
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
        message: `Toda la información de Carga de Fallas que contiene el archivo quedará
                registrada en la base de datos.`,
        accept: () => {
          // this.sendFileToService();
        },
        reject: () => { },
      });
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
    // this.dataPreview = null;
    this.structureToTable = [];
    this.dataToTable = [];
  }
}
