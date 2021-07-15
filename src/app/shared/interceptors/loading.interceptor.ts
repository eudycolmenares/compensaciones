import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, defer } from 'rxjs';
import { catchError, map, timeoutWith } from 'rxjs/operators'

import { LoadingService } from '../../services/loading/loading.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import {
  messagesToast as msgsToast,
  maxTimeExpectRequestSeconds as maxTimeReq
} from '../../libraries/utilities.library';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingSvc: LoadingService,
    private toastScv: ToastService,
    private authSvc: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Refresh sesion
    this.authSvc.isAuthenticated() && this.authSvc.resetMyTimeOut();
    this.loadingSvc.setLoading(true, request.url);
    return next.handle(request)
      .pipe(
        catchError((err) => {
          this.toastScv.showError(
            `${msgsToast.error_red} ${err['status']}`,
            msgsToast.error_title,
            msgsToast.time_default,
            true
          );
          this.loadingSvc.setLoading(false, request.url);
          return err;
        }),
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.loadingSvc.setLoading(false, request.url);
          }
          return evt;
        }),
        timeoutWith(maxTimeReq, defer(() =>
          {
            this.toastScv.showError(msgsToast.timeout_request, msgsToast.error_title);
            this.loadingSvc.setLoading(false, request.url);

            return null;
          }
        ))
      )
  }
}
