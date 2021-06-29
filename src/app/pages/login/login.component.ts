import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../services/general-functions.service';
import { ToastService } from '../../shared/services/toast.service';
import { StorageService } from '../../shared/services/storage.service';
import { UsersService } from '../../services/users/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { ParametersService } from '../../shared/services/parameters.service';
import { RequestLoginModel as loginModel } from '../../models/users';
import {
  itemsStorage,
  paramsLogin
} from '../../libraries/utilities.library';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  iconShowHidePass = 'bi bi-eye-fill';
  disabledBtn = true;

  constructor(
    private fb: FormBuilder,
    private gnrScv: GeneralFunctionsService,
    private usersSvc: UsersService,
    private toastScv: ToastService,
    private authSvc: AuthService,
    private storageSvc: StorageService,
    private paramsSvc: ParametersService
  ) {
    this.createForm();
    // check server services
    this.paramsSvc.consumeInitialServices().then(resp => {
      this.disabledBtn = false;
    }).catch(err => this.disabledBtn = false );
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
        idApp : paramsLogin.idApp
      }
      this.usersSvc.login(dataRequest).subscribe(resp => {
        
        // SETEADO
        resp = {
          correoAliado: 'test@mail.com',
          estado: 'activo',
          fechaExpiracionToken: '22-026-2021',
          nitAliado: 'test',
          nombreAliado: 'test',
          token_session: 'TOKENTEST',
          usuario: {
            codPerfil: 'CODTEST',
            descripcion: 'DESCTEST',
            entityClass: '',
            estado: '',
            idPerfil: 1,
            idUsuario: 1,
            listRoles: [],
            nombre: '',
            usuario: 'USERTEST'
          }
        }
        
        if(resp.token_session !== '') {
          this.authSvc.login(resp);
          this.toastScv.showSuccess('Sesión iniciada corectamente.');
          this.storageSvc.setItem(itemsStorage.lastUser, dataRequest.usuario);
        }else{
          this.toastScv.showError(resp.estado);
        }
      },() => { })
    }
  }

  changeStylePass() {
    (this.iconShowHidePass === 'bi bi-eye-fill')
      ? this.iconShowHidePass = 'bi bi-eye-slash-fill'
      : this.iconShowHidePass = 'bi bi-eye-fill';
  }
}
