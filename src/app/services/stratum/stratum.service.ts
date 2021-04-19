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
    return this.http.get<strataApiModel>(env.endpoints.Stratum.url + env.endpoints.Stratum.endpoints.readall, { headers: this.headers });
  }

  createStratum(body: requestModel): Observable<responseModel> {
    return this.http.post<responseModel>(env.endpoints.Stratum.url + env.endpoints.Stratum.endpoints.create, body, {
      headers: this.headers,
    });
  }

  updateStratum(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.endpoints.Stratum.url + env.endpoints.Stratum.endpoints.update, body, {
      headers: this.headers,
    });
  }

  deleteStratum(id: string): Observable<responseModel> {
    return this.http.delete<responseModel>(env.endpoints.Stratum.url + env.endpoints.Stratum.endpoints.delete + `/${id}`, {
      headers: this.headers,
    });
  }
}
