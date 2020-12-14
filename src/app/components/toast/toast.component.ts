import { Component, TemplateRef } from '@angular/core';

import { ToastService } from '../../services/shared/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <ngb-toast
      *ngFor="let toast of toastSvc.toasts"
      [header]="toast.headertext"
      [class]="toast.classname"
      [autohide]="toast.autohide || true"
      [delay]="toast.delay || 5000"
      (hide)="toastSvc.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})

export class ToastComponent {

  constructor(public toastSvc: ToastService) {}

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

}
