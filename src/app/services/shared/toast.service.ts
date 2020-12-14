import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  toasts: any[] = [];

  constructor() { }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  //

  showStandard(msg: string, time = 5000) {
    this.show(msg, {
      delay: time,
      autohide: true
    });
  }

  showSuccess(msg: string, time = 5000) {
    this.show(msg, {
      classname: 'bg-success text-light',
      delay: time ,
      autohide: true,
      // headertext: 'Toast Header'
    });
  }

  showError(msg: string, time = 5000) {
    this.show(msg, {
      classname: 'bg-danger text-light',
      delay: time,
      autohide: true,
      // headertext: 'Error!!!'
    });
  }
}
