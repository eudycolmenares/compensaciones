import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { RequestModel, SystemStatusModel, SystemStatusApiModel, ResponseModel } from '../../models/system-status';


@Injectable({
  providedIn: 'root',
})
export class SystemStatusService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });
  _systemStatus$ = new BehaviorSubject<SystemStatusModel[]>([]);
  constructor(private _http: HttpClient,) { }

  allSystemStatus(): void { // acomodar
    this._http.get<SystemStatusApiModel>(env.URL_API + env.endpoints.system_status_read, { headers: this.headers })
    .pipe(
      tap(data => this._systemStatus$.next(data.SystemsStatus.SystemStatus)),
      // tap(console.log) // acomodar
    ).subscribe();
  }

  createSystemStatus(body: RequestModel): Observable<ResponseModel> {
    return this._http.post<any>(env.URL_API + env.endpoints.system_status_create, body, {
      headers: this.headers,
    });
  }

  updateSystemStatus(body: RequestModel): Observable<SystemStatusApiModel> {
    return this._http.put<SystemStatusApiModel>(env.URL_API + env.endpoints.system_status_update, body, {
      headers: this.headers,
    });
  }

  deleteSystemStatus(systemStatusId: string): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(env.URL_API + env.endpoints.system_status_delete_id  + `/${systemStatusId}`);
  }

  // table
  get systemStatus$() { return this._systemStatus$.asObservable(); }
}
