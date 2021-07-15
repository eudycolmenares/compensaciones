import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  respUpdateProcessModel as respUpdateModel,
  reqUpdateProcessModel as reqUpdateModel
} from '../../models/supervisionProcess';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class SupervisionProcessService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(private http: HttpClient) { }

  allProcess(): Observable<any> {
    return this.http.get<any>(
      env.endpoints.BillingSupervision.url + env.endpoints.BillingSupervision.endpoints.readAll,
      { headers: this.headers }
    );
  }

  updateProcess(body: reqUpdateModel): Observable<respUpdateModel> {
    return this.http.put<respUpdateModel>(
      env.endpoints.BillingSupervision.url + env.endpoints.BillingSupervision.endpoints.update,
      body,
      { headers: this.headers }
    );
  }
}
