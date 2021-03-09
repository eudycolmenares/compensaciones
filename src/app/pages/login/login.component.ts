import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../services/general-functions.service';
import { ToastService } from '../../shared/services/toast.service';
import { StorageService } from '../../shared/services/storage.service';
import { UsersService } from '../../services/users/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { RequestLoginModel as loginModel } from '../../models/users';
import { itemsStorage } from '../../libraries/utilities.library';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  iconShowHidePass = 'bi bi-eye-fill';

  constructor(
    private fb: FormBuilder,
    private gnrScv: GeneralFunctionsService,
    private usersSvc: UsersService,
    private toastScv: ToastService,
    private authSvc: AuthService,
    private storageSvc: StorageService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    const lastUser = this.storageSvc.getItem(itemsStorage.lastUser);
    this.form = this.fb.group({
      id: [''],
      usuario: [(lastUser === null) ? '' : lastUser, [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(40)]],
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
    }else{
      const dataRequest: loginModel  = {
        usuario: this.form.get('usuario').value,
        password: this.form.get('password').value,
        idApp : "AT" // SETEADO
      }
      this.usersSvc.login(dataRequest).subscribe(resp => {
        if(resp.token_session !== '') {
          this.authSvc.login(resp);
          this.toastScv.showSuccess('Sesión iniciada corectamente.');
          this.storageSvc.setItem(itemsStorage.lastUser, dataRequest.usuario);
        }else{
          this.toastScv.showError(resp.estado);
        }
      })
    }
  }

  changeStylePass() {    
    (this.iconShowHidePass === 'bi bi-eye-fill')
      ? this.iconShowHidePass = 'bi bi-eye-slash-fill'
      : this.iconShowHidePass = 'bi bi-eye-fill';
  }
}
