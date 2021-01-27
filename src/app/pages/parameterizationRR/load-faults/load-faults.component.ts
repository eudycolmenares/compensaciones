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
      const dataRequest = {
        'file': this.fileBaseData,
        'fileName': this.fileBaseName,
        'loadType': this.form.get('type').value,
        'userName': 'test', // seteado
      }
      this.faultsScv.loadFaults(dataRequest).subscribe((resp: faultsApiModel) => {
        // const idLoad = resp.Loads.Load[0].idLoad;
        if(resp.GeneralResponse.code === '0') {
          this.toastScv.showSuccess(resp.GeneralResponse.descriptionCode);
        }else{
          this.toastScv.showError(resp.GeneralResponse.descriptionCode);
          // this.faultsScv.readByIdFaults(idLoad).subscribe(resp => { //seteado 353
          // });
        }
        this.cleanForm();
      })
    }
  }

  handleFileInput(e: Event) {
    this.fileBaseName = e.target['files'][0]['name'];
    let reader = new FileReader();
    reader.readAsDataURL(e.target['files'][0]);
    reader.onload = () => {
      const fileString = reader.result.toString().split(';base64,');
      this.fileBaseData = fileString[fileString.length -1];
    };
    // reader.onerror = function (error) {
    //   console.log('Error: ', error);
    // };
 }

  cleanForm() {
    this.form.reset({
      type: ''
    });
  }
}
