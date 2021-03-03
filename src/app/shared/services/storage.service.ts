import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class StorageService {
  supported = false;

  constructor() {
    (typeof(Storage)) ? this.supported = true : this.supported = false;
  }

  setItem(itemBD, data) {
    data = JSON.stringify(data);
    if(this.supported) {
      localStorage.setItem(itemBD, data);
    }
  }

  getItem(item) {
    if(this.supported) {
      const data = localStorage.getItem(item);
      return JSON.parse(data);
    }
  }

  removeItem(itemBD) {
    if(this.supported) {
      localStorage.removeItem(itemBD);
    }
  }
}
