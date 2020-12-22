import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  RequestModel,
  PriorityModel,
  PrioritiesApiModel,
  ResponseModel,
} from '../../models/priority';

@Injectable({
  providedIn: 'root',
})
export class PriorityService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });
  constructor(private _http: HttpClient) {}

  allPriorities() {
    return this._http.get<PrioritiesApiModel>(
      env.URL_API + env.endpoints.priorities_read,
      { headers: this.headers }
    );
  }

  createPriority(body: RequestModel): Observable<ResponseModel> {
    return this._http.post<any>(
      env.URL_API + env.endpoints.priority_create,
      body,
      {
        headers: this.headers,
      }
    );
  }

  updatePriority(body: RequestModel): Observable<PrioritiesApiModel> {
    return this._http.put<PrioritiesApiModel>(
      env.URL_API + env.endpoints.priority_update,
      body,
      {
        headers: this.headers,
      }
    );
  }

  deletePriority(priorityId: number): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(
      env.URL_API + env.endpoints.priority_delete_id + `/${priorityId}`
    );
  }
}
