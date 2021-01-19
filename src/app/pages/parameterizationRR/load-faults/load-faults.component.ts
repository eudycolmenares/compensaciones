import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../services/shared/toast.service';
import { FaultsService } from '../../../services/faults/faults.service';
import { faultsApiModel } from '../../../models/faults';

@Component({
  selector: 'app-load-faults',
  templateUrl: './load-faults.component.html',
  styleUrls: ['./load-faults.component.scss']
})

export class LoadFaultsComponent implements OnInit {
  form: FormGroup;
  fileBaseData: string;
  fileBaseName: String;

  constructor(
    private fb: FormBuilder,
    private gnrSvc: GeneralFunctionsService,
    private toastScv: ToastService,
    private faultsScv: FaultsService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      file: ['', Validators.required],
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
      console.log('$$$$$$$$$');
      console.log(this.form.value);

      const dataRequest = { // acomodar
        'file': this.fileBaseData,
        'fileName': this.fileBaseName,
        'loadType': this.form.get('type').value,
        'userName': 'test', // seteado
      }
      this.faultsScv.loadFaults(dataRequest).subscribe((resp: faultsApiModel) => {
        console.log('Respuesta Servicio:', resp);
        if(resp.GeneralResponse.code === '0') {
          const idLoad = resp.Loads.Load[0].idLoad;
          this.toastScv.showSuccess(resp.GeneralResponse.messageCode);
          this.faultsScv.readByIdFaults('353').subscribe(resp => { //seteado
            console.log('respuesta readByIdFaults()', resp);
            // console.log('File: ', resp.Loads.Load[0].loadFile);
            // console.log('File: ', atob(resp.Loads.Load[0].loadFile));
          })
        }else{
          this.toastScv.showError(resp.GeneralResponse.messageCode);
        }
      })
    }
  }

  handleFileInput(e: Event) {
    this.fileBaseName = e.target['files'][0]['name'];
    let reader = new FileReader();
    reader.readAsDataURL(e.target['files'][0]);
    reader.onload = () => {
      // console.log('>>', reader);
      const fileString = reader.result.toString().split(';base64,');
      this.fileBaseData = fileString[fileString.length -1];
    };
    // reader.onerror = function (error) {
    //   console.log('Error: ', error);
    // };
 }

  cleanForm() {
    this.form.reset();
  }
}
