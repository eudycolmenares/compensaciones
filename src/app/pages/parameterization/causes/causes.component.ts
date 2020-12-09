import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.scss']
})
export class CausesComponent implements OnInit {
  causeForm: FormGroup;
  statusForm: boolean = false;
  dataTest = [{id: 1, vData:"case 1"},
  {id: 2, vData:"case 2"}, ];
  constructor(private _fb: FormBuilder) { }

  createForm() {
    this.causeForm = this._fb.group({
      codeAnomaly: ['', Validators.required],
      descriptionAnomaly: ["", Validators.required],
      problemCode: ["", Validators.required],
      descriptionProblem: ["", Validators.required],
      causeCode: ["", Validators.required],
      descriptionCause: ["", Validators.required],
      origin: ["", Validators.required],
      typeOrigin: ["", Validators.required],
      service: ["", Validators.required],
      status: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    this.statusForm = true;
    console.log("enviado :)");
  }

  validationForm(campValidation){
    console.log(campValidation);
    return this.causeForm.get(campValidation).hasError('required') ? "El campo es obligatorio" : '';
  }
}
