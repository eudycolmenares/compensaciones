import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';
import { ResponseLoginModel as LoginModel } from '../../models/users';
import {
  itemsStorage,
  timeExpirationMinutes as timeExp,
  messagesToast as mgsToast
} from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authState = new BehaviorSubject<LoginModel>(null);
  timeOutSesion = null;

  constructor(
    private stgSvc : StorageService,
    private toastScv: ToastService,
    ) { }

  setDataUser(user: LoginModel) {
    this.authState.next(user);
    this.stgSvc.setItem(itemsStorage.user, user);
  }

  login(user: LoginModel) {
    this.setDataUser(user);
    this.startMyTimeOut();
  }

  logout() {
    this.clearMyTimeOut();
    this.setDataUser(<LoginModel>(null));
    this.stgSvc.removeItem(itemsStorage.user);
    this.toastScv.showError(mgsToast.close_sesion, '', mgsToast.time_default, true);
  }

  isAuthenticated() {
    return (this.authState.value) ? true : false;
  }

  public get userData() {
    return this.authState.value;
  }

  startMyTimeOut() {
    this.timeOutSesion = setTimeout(() => {
      this.logout();
    }, (timeExp * 60000) )
  }
  clearMyTimeOut() {
    clearTimeout(this.timeOutSesion)
  }
  resetMyTimeOut() {
    this.clearMyTimeOut();
    this.startMyTimeOut();
  }
}
