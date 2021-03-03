import { Injectable, TemplateRef } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  toasts: any[] = [];

  constructor(private messageSvc: MessageService) { }

  show(typeSeverity, message, title, time) {
    this.messageSvc.add({
      severity: typeSeverity,
      summary: title,
      detail: message,
      life: time
    });
  }

  showSuccess(message: string, title = '', time = 5000) {
    this.show('success', message, title, time);
  }

  showError(message: string, title = '', time = 5000) {
    this.show('error', message, title, time);
  }

  remove(toast) {
    // this.toasts = this.toasts.filter(t => t !== toast);
  }

  showStandard(msg: string, time = 5000) {
    // this.show(msg, {
    //   delay: time,
    //   autohide: true
    // });
  }
}
