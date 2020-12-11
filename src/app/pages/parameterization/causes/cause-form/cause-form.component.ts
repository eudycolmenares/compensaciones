import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cause-form',
  templateUrl: './cause-form.component.html',
  styleUrls: ['./cause-form.component.scss'],
})
export class CauseFormComponent implements OnInit {
  causeForm: FormGroup;
  statusForm: boolean = false;
  dataTest = [
    { id: 1, vData: 'case 1' },
    { id: 2, vData: 'case 2' },
  ];
  constructor(private _fb: FormBuilder) {}

  createForm() {
    this.causeForm = this._fb.group({
      codeAnomaly: ['', [Validators.required, Validators.maxLength(255)]],
      descriptionAnomaly: ['', [Validators.maxLength(255)]],
      problemCode: ['', [Validators.required]],
      descriptionProblem: ['', [Validators.required]],
      causeCode: [''],
      descriptionCause: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      typeOrigin: [''],
      service: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    this.statusForm = true;
    console.log('enviado :)');
  }

  validationForm(campValidation) {
    return this.causeForm.get(campValidation).hasError('required')
      ? 'El campo es obligatorio'
      : '';
  }

  validationFormTextRequired(campValidation) {
    return this.causeForm.get(campValidation).hasError('required')
      ? 'El campo es obligatorio'
      : !this.causeForm.get(campValidation).hasError('maxLength')
      ? 'El campo supera lo permitido'
      : '';
  }

  validationFormText(campValidation) {
    return !this.causeForm.get(campValidation).hasError('maxLength')
      ? 'El campo supera lo permitido'
      : '';
  }
}
