import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  RequestModel,
  SystemStatusModel,
  SystemStatusApiModel,
  ResponseModel,
} from '../../models/system-status';

@Injectable({
  providedIn: 'root',
})
export class SystemStatusService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });
  constructor(private _http: HttpClient) {}

  allSystemStatus() {
    return this._http.get<SystemStatusApiModel>(
      env.endpoints.SystemStatus.url + env.endpoints.SystemStatus.endpoints.readall,
      { headers: this.headers }
    );
  }

  createSystemStatus(body: RequestModel): Observable<ResponseModel> {
    return this._http.post<any>(
      env.endpoints.SystemStatus.url + env.endpoints.SystemStatus.endpoints.create,
      body,
      {
        headers: this.headers,
      }
    );
  }

  updateSystemStatus(body: RequestModel): Observable<SystemStatusApiModel> {
    return this._http.put<SystemStatusApiModel>(
      env.endpoints.SystemStatus.url + env.endpoints.SystemStatus.endpoints.update,
      body,
      {
        headers: this.headers,
      }
    );
  }

  deleteSystemStatus(systemStatusId: string): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(
      env.endpoints.SystemStatus.url + env.endpoints.SystemStatus.endpoints.delete + `${systemStatusId}`
    );
  }
}
