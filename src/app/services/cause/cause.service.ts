import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  RequestModel,
  CausesApiModel,
  ResponseModel,
} from '../../models/cause';

@Injectable({
  providedIn: 'root',
})
export class CauseService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private _http: HttpClient) {}

  allCauses() {
    return this._http.get<CausesApiModel>(
      env.endpoints.Cause.url + env.endpoints.Cause.endpoints.readall,
      {
        headers: this.headers,
      }
    );
  }

  createCause(body: RequestModel): Observable<ResponseModel> {
    return this._http.post<any>(
      env.endpoints.Cause.url + env.endpoints.Cause.endpoints.create,
      body,
      {
        headers: this.headers,
      }
    );
  }

  updateCause(body: RequestModel): Observable<CausesApiModel> {
    return this._http.put<CausesApiModel>(
      env.endpoints.Cause.url + env.endpoints.Cause.endpoints.update,
      body,
      {
        headers: this.headers,
      }
    );
  }

  deleteCause(causeId: string): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(
      env.endpoints.Cause.url + env.endpoints.Cause.endpoints.delete + `${causeId}`
    );
  }
}
