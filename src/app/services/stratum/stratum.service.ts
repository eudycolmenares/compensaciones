import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { strataApiModel, requestModel, responseModel } from '../../models/stratum';

@Injectable({
  providedIn: 'root'
})

export class StratumService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  allStrata(): Observable<strataApiModel> {
    return this.http.get<strataApiModel>(env.URL_API + env.endpoints.stratum_all, { headers: this.headers });
  }

  createStratum(body: requestModel): Observable<responseModel> {
    return this.http.post<responseModel>(env.URL_API + env.endpoints.stratum_create, body, {
      headers: this.headers,
    });
  }

  updateStratum(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.URL_API + env.endpoints.stratum_update, body, {
      headers: this.headers,
    });
  }

  deleteStratum(id: string): Observable<responseModel> {
    return this.http.delete<responseModel>(env.URL_API + env.endpoints.stratum_delete + `/${id}`, {
      headers: this.headers,
    });
  }
}
