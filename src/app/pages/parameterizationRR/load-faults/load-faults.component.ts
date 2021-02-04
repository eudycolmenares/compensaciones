import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../services/shared/toast.service';
import { FaultsService } from '../../../services/faults/faults.service';
import { faultsApiModel } from '../../../models/faults';

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
  templateOptionsList: object[] = [
    { valueOption: 'RESIDENTIAL', nameOption: 'Residencial' },
    { valueOption: 'BUILDINGS', nameOption: 'Edificios' },
    { valueOption: 'SMES', nameOption: 'Pymes' },
    { valueOption: 'RESIDENTIAL_SETTING', nameOption: 'Ajuste Residencial' },
    { valueOption: 'SME_ADJUSTMENT', nameOption: 'Ajuste Pymes' },
    { valueOption: 'MAINTENANCE_ORDERS', nameOption: 'Ordenes Mantenimiento' },
  ];

  constructor(
    private fb: FormBuilder,
    private gnrSvc: GeneralFunctionsService,
    private toastScv: ToastService,
    private faultsScv: FaultsService,
    private _confirmationService: ConfirmationService,
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
      this._confirmationService.confirm({
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
    console.log('dataRequest: ', dataRequest);

    this.faultsScv.loadFaults(dataRequest).subscribe((resp: faultsApiModel) => {
      console.log('Respuesta al cargar servicio??', resp);


      if(resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.descriptionCode);
      }else{
        console.log('error??');

        this.toastScv.showError(resp.GeneralResponse.descriptionCode);
        // this.faultsScv.readByIdFaults(idLoad).subscribe(resp => { //seteado 353
        // });
      }
      this.cleanForm();
    })
  }

  handleFileInput(e: Event) {
    this.fileBaseName = e.target['files'][0]['name'];
    let reader = new FileReader();
    reader.readAsDataURL(e.target['files'][0]);
    reader.onload = () => {
      const fileString = reader.result.toString().split(';base64,');
      this.fileBaseData = fileString[fileString.length -1];
    };
  }

  downloadTemplate(option) {
    console.log('downloadTemplate() ', option);
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
  }
  cleanInputFile() {
    this.form.controls.file.setValue('');
    this.fileBaseName = '';
  }

}
