import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { requestModel, responseModel, originsApiModel } from '../../models/origin-type';

@Injectable({
  providedIn: 'root'
})

export class OriginTypeService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private http: HttpClient
  ) {
  }

  allOrigins() {
    return this.http.get<originsApiModel>(env.endpoints.Origin.url + env.endpoints.Origin.endpoints.readall, { headers: this.headers });
  }

  createOrigin(body: requestModel): Observable<responseModel> {
    return this.http.post<any>(env.endpoints.Origin.url + env.endpoints.Origin.endpoints.create, body, {
      headers: this.headers,
    });
  }

  updateOrigin(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.endpoints.Origin.url + env.endpoints.Origin.endpoints.update, body, {
      headers: this.headers,
    });
  }

  deleteOrigin(id: string): Observable<responseModel> {
    return this.http.delete<responseModel>(env.endpoints.Origin.url + env.endpoints.Origin.endpoints.delete + `${id}`, {
      headers: this.headers,
    });
  }
}
