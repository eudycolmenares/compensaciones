import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  MaintenanceOrderCauseModel,
  MaintenanceOrdersCausesApiModel,
  RequestModel,
  ResponseModel,
} from '../../models/maintenance-orders-causes';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceOrdersCausesService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private _http: HttpClient) {}

  allMaintenanceOrdersCauses() {
    return this._http.get<any>(
      env.URL_API + env.endpoints.maintenanceOrdersCauses_read,
      {
        headers: this.headers,
      }
    );
  }

  createMaintenanceOrderCause(body: RequestModel): Observable<ResponseModel> {
    console.log('body', body);

    return this._http.post<ResponseModel>(
      env.URL_API + env.endpoints.maintenanceOrderCause_create,
      body,
      {
        headers: this.headers,
      }
    );
  }

  updateMaintenanceOrderCause(body: RequestModel): Observable<ResponseModel> {
    console.log('body', body);

    return this._http.put<ResponseModel>(
      env.URL_API + env.endpoints.maintenanceOrderCause_update,
      body,
      {
        headers: this.headers,
      }
    );
  }

  deleteMaintenanceOrderCause(
    id: number
  ): Observable<MaintenanceOrdersCausesApiModel> {
    return this._http.delete<MaintenanceOrdersCausesApiModel>(
      env.URL_API + env.endpoints.maintenanceOrderCause_delete + `/${id}`
    );
  }
}
