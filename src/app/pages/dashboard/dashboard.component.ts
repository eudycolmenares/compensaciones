import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../shared/services/storage.service';
import { itemsStorage } from '../../libraries/utilities.library';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  opened: boolean;

  constructor(private storageSvc: StorageService) {
    const checkMenu = this.storageSvc.getItem(itemsStorage.menu);
    (checkMenu === null || checkMenu === true) ? this.opened = true : this.opened = false;
  }

  ngOnInit(): void { }

  swToggle(e) {
    this.opened = e;
    this.storageSvc.setItem(itemsStorage.menu, e);
  }
}
