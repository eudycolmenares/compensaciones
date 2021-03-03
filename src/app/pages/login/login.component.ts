import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../services/general-functions.service';
import { UsersService } from '../../services/users/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { RequestLoginModel as loginModel } from '../../models/users';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gnrScv: GeneralFunctionsService,
    private usersSvc: UsersService,
    private toastScv: ToastService,
    private authSvc: AuthService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.fb.group({ // SETEADO
      id: [''],
      usuario: ['ECM8053I', [Validators.required, Validators.maxLength(20)]],
      password: ['Holly_2095', [Validators.required, Validators.maxLength(40)]],
      idApp: [''],
    })
  }
  get invalidUser() {
    return this.form.get('usuario').touched && this.form.get('usuario').invalid;
  }
  get invalidPassword() {
    return this.form.get('password').touched && this.form.get('password').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrScv.validationFormTextRequired(this.form, field);
  }

  onSubmit() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      console.log('onSubmit()', this.form.value);
      const dataRequest: loginModel  = {
        usuario: this.form.get('usuario').value,
        password: this.form.get('password').value,
        idApp : "AT" // SETEADO
      }
      this.usersSvc.login(dataRequest).subscribe(resp => {
        console.log('login() ', resp);
        if(resp.token_session !== '') {
          this.authSvc.login(resp);
          this.toastScv.showSuccess('Sesión iniciada corectamente.');
        }else{
          this.toastScv.showError(resp.estado);
        }
      })
    }
  }

  // TEST
  closeSession() {
    console.log('closeSession()');
    this.authSvc.logout();
  }
  getSession() {
    console.log('getSession()');
    console.log(this.authSvc.userData);
  }
}
