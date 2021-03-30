import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  BillingPeriodsApiModel,
  ResponseModel,
  RequestModel
} from '../../models/billing-periods';

@Injectable({
  providedIn: 'root'
})
export class BillingPeriodsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private _http: HttpClient) {}

  allBillingPeriods(): Observable<BillingPeriodsApiModel> {
    return this._http.get<BillingPeriodsApiModel>(
      env.BillingPeriods.url + env.BillingPeriods.endpoints.readAll,
      {
        headers: this.headers,
      }
    );
  }

  validationBillingPeriods() {
    let dateNow = new Date();
    this.allBillingPeriods().subscribe((resp: BillingPeriodsApiModel) => {
      try {
        let dataFiltered = resp.tblBillingPeriods.filter(data => (new Date(data.startDate) >= dateNow && new Date(data.endDate) <= dateNow));
        console.log('fecha filtrada', dataFiltered);
      } catch (error) {
        console.log(error);
        
      }
      
      
    });
  }

  createBillingPeriod(body: RequestModel): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(
      env.BillingPeriods.url + env.BillingPeriods.endpoints.create,
      body,
      {
        headers: this.headers,
      }
    );
  }

  updateBillingPeriod(body: RequestModel): Observable<ResponseModel> {
    return this._http.put<ResponseModel>(
      env.BillingPeriods.url + env.BillingPeriods.endpoints.update,
      body,
      {
        headers: this.headers,
      }
    );
  }

  deleteBillingPeriod(periodId: number): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(
      env.BillingPeriods.url + env.BillingPeriods.endpoints.delete + `/${periodId}`,
      {
        headers: this.headers,
      }
    );
  }
}
