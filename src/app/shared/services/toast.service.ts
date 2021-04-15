import { Injectable, TemplateRef } from '@angular/core';
import { MessageService } from 'primeng/api';

import { messagesToast as mgsToast } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  toasts: any[] = [];

  constructor(private messageSvc: MessageService) { }

  show(typeSeverity, message, title, time, sticky) {
    this.messageSvc.add({
      severity: typeSeverity,
      summary: title,
      detail: message,
      life: time,
      sticky: sticky,
    });
  }

  showSuccess(message: string, title = '', time = mgsToast.time_default, sticky = false) {
    this.show('success', message, title, time, sticky);
  }

  showError(message: string, title = '', time = mgsToast.time_default, sticky = false) {
    this.show('error', message, title, time, sticky);
  }

  remove(toast) {
    // this.toasts = this.toasts.filter(t => t !== toast);
  }

  showStandard(msg: string, time = mgsToast.time_default) {
    // this.show(msg, {
    //   delay: time,
    //   autohide: true
    // });
  }
}
