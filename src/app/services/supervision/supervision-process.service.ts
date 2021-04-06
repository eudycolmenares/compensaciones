import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  respUpdateProcessModel as respUpdateModel,
  reqUpdateProcessModel as reqUpdateModel
} from '../../models/supervisionProcess';

@Injectable({
  providedIn: 'root'
})

export class SupervisionProcessService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  allProcess(): Observable<any> {
    return this.http.get<any>(env.BillingSupervision.url + env.BillingSupervision.endpoints.readAll, { headers: this.headers });
  }

  updateProcess(body: reqUpdateModel): Observable<respUpdateModel> {
    return this.http.put<respUpdateModel>(
      env.BillingSupervision.url + env.BillingSupervision.endpoints.update,
      body,
      { headers: this.headers }
    );
  }
}
