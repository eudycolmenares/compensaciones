import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { originModel, requestModel, responseModel, originsApiModel } from '../../models/origin-type';

@Injectable({
  providedIn: 'root'
})

export class OriginTypeService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });
  // table
  _origins$ = new BehaviorSubject<originModel[]>([]);

  constructor(private http: HttpClient) { }

  allOrigins(): void {
    this.http.get<originsApiModel>(env.URL_API + env.endpoints.origin_all, { headers: this.headers })
    .pipe(
      tap(data => this._origins$.next(data.OriginTypes.OriginType))
    ).subscribe();
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

  // table
  get origins$() { return this._origins$.asObservable(); }
}
