import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  supported = false;

  constructor() {
    (typeof(Storage)) ? this.supported = true : this.supported = false;
  }

  setItem(item, value) {
    if(this.supported) {
      localStorage.setItem(item, value);
    }
  }

  getItem(item) {
    if(this.supported) {
      return localStorage.getItem(item);
    }
  }
}
