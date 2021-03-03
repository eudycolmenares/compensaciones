import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StorageService } from '../services/storage.service';
import { ResponseLoginModel as LoginModel } from '../../models/users';
import { itemsStorage } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authState = new BehaviorSubject<LoginModel>(null);

  constructor(private stgSvc : StorageService) { }

  setDataUser(user: LoginModel) {
    this.authState.next(user);
    this.stgSvc.setItem(itemsStorage.user, user);
  }

  login(user: LoginModel) {
    this.setDataUser(user);
  }

  logout() {
    this.setDataUser(<LoginModel>(null));
    this.stgSvc.removeItem(itemsStorage.user)
  }

  public get userData() {
    return this.authState.value;
  }
}
