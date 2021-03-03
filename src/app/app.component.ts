import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

import { LoadingService } from './services/loading/loading.service';
import { AuthService } from './shared/services/auth.service';
import { StorageService } from './shared/services/storage.service';
import {
  languagePrimeNG,
  itemsStorage
} from './libraries/utilities.library';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loading = false;

  constructor(
    private loadingSvc: LoadingService,
    private authSvc: AuthService,
    private configPNG: PrimeNGConfig,
    private router: Router,
    private stgSvc: StorageService
  ){
    this.initialSettings();
  }

  initialSettings() {
    this.listenToLoading();
    //
    this.configPNG.setTranslation(languagePrimeNG);
    //
    const userInStorage = this.stgSvc.getItem(itemsStorage.user);
    if(userInStorage === null) {
      this.subscribeUserState();
    }else{
      this.authSvc.setDataUser(userInStorage);
      this.subscribeUserState();
    }
  }

  listenToLoading(): void {
    this.loadingSvc.loading$
    .pipe(delay(0))
    .subscribe((loading: boolean) => this.loading = loading);
  }

  subscribeUserState() {
    this.authSvc.authState.subscribe(resp => {
      console.log('APPCOMPONENT() Subscripcion: ', resp);
      if(resp !== null) {
        this.router.navigateByUrl('/dashboard')
      }else{
        this.router.navigateByUrl('/login')
      }
    })
  }
}
