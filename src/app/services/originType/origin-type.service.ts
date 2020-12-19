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
    return this.http.get<originsApiModel>(env.URL_API + env.endpoints.origin_all, { headers: this.headers });
  }

  createOrigin(body: requestModel): Observable<responseModel> {
    return this.http.post<any>(env.URL_API + env.endpoints.origin_create, body, {
      headers: this.headers,
    });
  }

  updateOrigin(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.URL_API + env.endpoints.origin_update, body, {
      headers: this.headers,
    });
  }

  deleteOrigin(id: string): Observable<responseModel> {
    return this.http.delete<responseModel>(env.URL_API + env.endpoints.origin_delete + `/${id}`, {
      headers: this.headers,
    });
  }
}
