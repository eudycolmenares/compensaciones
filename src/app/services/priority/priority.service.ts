import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { requestModel, PriorityModel, prioritiesApiModel, responseModel } from '../../models/priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });
  _priorities$ = new BehaviorSubject<PriorityModel[]>([]);
  constructor(private _http: HttpClient,) { }

  allPriorities(): void { // acomodar
    this._http.get<prioritiesApiModel>(env.URL_API + env.endpoints.priorities_read, { headers: this.headers })
    .pipe(
      tap(data => this._priorities$.next(data.priority)),
      // tap(console.log) // acomodar
    ).subscribe();
  }

  createPriority(body: requestModel): Observable<responseModel> {
    return this._http.post<any>(env.URL_API + env.endpoints.priority_create, body, {
      headers: this.headers,
    });
  }

  updatePriority(body: requestModel): Observable<prioritiesApiModel> {
    return this._http.put<prioritiesApiModel>(env.URL_API + env.endpoints.priority_update, body, {
      headers: this.headers,
    });
  }

  deletePriority(priorityId: number): Observable<responseModel> {
    return this._http.delete<responseModel>(env.URL_API + env.endpoints.priority_delete_id  + `/${priorityId}`);
  }

  // table
  get priorities$() { return this._priorities$.asObservable(); }
}
