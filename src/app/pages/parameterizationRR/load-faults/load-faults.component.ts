import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../services/shared/toast.service';
import { FaultsService } from '../../../services/faults/faults.service';
import { faultsApiModel } from '../../../models/faults';
import { log } from 'console';

// modal

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Confirmar</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>¿Estás seguro que deseas enviar el archivo?</strong></p>
    <p>Toda la información de Carga de Fallas que contiene el archivo quedará registrada en la base de datos.</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Confirmar</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

//

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
    private faultsScv: FaultsService,
    private modalService: NgbModal
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
      const modal = this.modalService.open(NgbdModalConfirm);
      modal.result.then(result => {
        this.sendFileToService();
      }).catch(error => {});
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
