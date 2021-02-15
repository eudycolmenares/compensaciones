import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {} from '../../models/maintenance-orders-causes';

@Injectable({
  providedIn: 'root',
})
export class NodesValidationService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private _http: HttpClient) {}

  allNodesValidation() {
    return this._http.get<any>(
      env.URL_API + env.endpoints.validationNodes_read,
      {
        headers: this.headers,
      }
    );
  }

  createNodeValidation(body: any): Observable<any> {
    console.log('body', body);

    return this._http.post<any>(
      env.URL_API + env.endpoints.maintenanceOrderCause_create,
      body,
      {
        headers: this.headers,
      }
    );
  }

  updateNodeValidation(body: any): Observable<any> {
    console.log('body', body);

    return this._http.put<any>(
      env.URL_API + env.endpoints.maintenanceOrderCause_update,
      body,
      {
        headers: this.headers,
      }
    );
  }

  deleteNodeValidation(): Observable<any> {
    return this._http.delete<any>(
      env.URL_API + env.endpoints.maintenanceOrderCause_delete
    );
  }
}
