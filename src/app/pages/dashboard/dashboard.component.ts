import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../shared/services/storage.service';
import { itemsStorage } from '../../libraries/utilities.library';
import { AuthService } from '@shared_services/auth.service';
import {
  useAppTimeExpirationMinutes as timeExp,
} from '@libraries/utilities.library';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  opened: boolean;
  timeoutStatus_refresh: boolean = true;

  constructor(
    private storageSvc: StorageService,
    protected authSvc: AuthService
  ) {
    const checkMenu = this.storageSvc.getItem(itemsStorage.menu);
    checkMenu === null || checkMenu === true
      ? (this.opened = true)
      : (this.opened = false);
  }

  ngOnInit(): void {}

  swToggle(e) {
    this.opened = e;
    this.storageSvc.setItem(itemsStorage.menu, e);
  }

  refreshAuthSesion() {
    if (this.timeoutStatus_refresh) {
      this.timeoutStatus_refresh = false;
      this.authSvc.isAuthenticated() && this.authSvc.resetMyTimeOut();
      setTimeout(() =>{
        this.timeoutStatus_refresh = true;
      }, (timeExp * 60000));
    }
  }
}
