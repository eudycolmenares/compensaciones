import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  BillingPeriodsApiModel,
  ResponseModel,
  RequestModel,
} from '../../models/billing-periods';
import { GeneralFunctionsService } from '../../services/general-functions.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { promise } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root',
})
export class BillingPeriodsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  currentPeriod= [];

  constructor(
    private _http: HttpClient,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {}

  allBillingPeriods(): Observable<BillingPeriodsApiModel> {
    return this._http.get<BillingPeriodsApiModel>(
      env.BillingPeriods.url + env.BillingPeriods.endpoints.readAll,
      {
        headers: this.headers,
      }
    );
  }

  validationBillingPeriods(): Promise<any> {
    const promise = new Promise((resol, reject) => {
      const  dateNow = new Date().setHours(0,0,0,0);
      this.allBillingPeriods().subscribe((resp: BillingPeriodsApiModel) => {
        this.currentPeriod = resp.tblBillingPeriods.filter(
          (data) =>
            dateNow >= this._gnrScv.formatDate_billingPeriods(data.startDate).setHours(0,0,0,0) &&
            dateNow <= this._gnrScv.formatDate_billingPeriods(data.endDate).setHours(23,59,59,999)
        );
        const DataNumber = this.currentPeriod.length;
        if (DataNumber > 0) {
          resol({
            exists: true,
            message: 'Existe un periodo de facturación en curso',
            currentPeriod: this.currentPeriod[DataNumber-1],
          });
        } else {
          reject({
            exists: false,
            message: 'No existe un periodo de facturación en curso',
            currentPeriod: this.currentPeriod,
          });
        }
      });
    });
    return promise;
  }

  createBillingPeriod(body: RequestModel): Observable<ResponseModel> {
    let responseValidation: any = this.validationBillingPeriods();
    console.log('responseValidation', responseValidation);

    if (responseValidation['exists']) {
      this._toastScv.showError('', responseValidation['message']);
      return;
    }
    return this._http.post<ResponseModel>(
      env.BillingPeriods.url + env.BillingPeriods.endpoints.create,
      body,
      {
        headers: this.headers,
      }
    );
  }

  updateBillingPeriod(body: RequestModel): Observable<ResponseModel> {
    let responseValidation: any = this.validationBillingPeriods();
    if (responseValidation['exists']) {
      this._toastScv.showError('', responseValidation['message']);
      return;
    }

    this.validationBillingPeriods();
    return this._http.put<ResponseModel>(
      env.BillingPeriods.url + env.BillingPeriods.endpoints.update,
      body,
      {
        headers: this.headers,
      }
    );
  }

  deleteBillingPeriod(periodId: number): Observable<ResponseModel> {
    let responseValidation: any = this.validationBillingPeriods();
    if (responseValidation['exists']) {
      this._toastScv.showError('', responseValidation['message']);
      return;
    }

    this.validationBillingPeriods();
    return this._http.delete<ResponseModel>(
      env.BillingPeriods.url +
        env.BillingPeriods.endpoints.delete +
        `/${periodId}`,
      {
        headers: this.headers,
      }
    );
  }
}
