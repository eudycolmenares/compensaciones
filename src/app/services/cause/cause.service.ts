import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  RequestModel,
  CauseModel,
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
      env.URL_API + env.endpoints.causes_read,
      {
        headers: this.headers,
      }
    );
  }

  createCause(body: RequestModel): Observable<ResponseModel> {
    return this._http.post<any>(
      env.URL_API + env.endpoints.cause_create,
      body,
      {
        headers: this.headers,
      }
    );
  }

  updateCause(body: RequestModel): Observable<CausesApiModel> {
    return this._http.put<CausesApiModel>(
      env.URL_API + env.endpoints.cause_update,
      body,
      {
        headers: this.headers,
      }
    );
  }

  deleteCause(causeId: string): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(
      env.URL_API + env.endpoints.cause_delete_id + `/${causeId}`
    );
  }
}
