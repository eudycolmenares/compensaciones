import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { requestModel, symptomModel, symptomsApiModel, responseModel } from '../../models/symptom';

@Injectable({
  providedIn: 'root'
})

export class SymptomService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });
  // table
  _symptoms$ = new BehaviorSubject<symptomModel[]>([]);

  constructor(private http: HttpClient) { }

  allSymptoms(): void {
    this.http.get<symptomsApiModel>(env.URL_API + env.endpoints.symptom_all, { headers: this.headers })
    .pipe(
      tap(data => this._symptoms$.next(data.symptom))
    ).subscribe();
  }

  createSymptom(body: requestModel): Observable<responseModel> {
    return this.http.post<any>(env.URL_API + env.endpoints.symptom_create, body, {
      headers: this.headers,
    });
  }

  updateSymptom(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.URL_API + env.endpoints.symptom_update, body, {
      headers: this.headers,
    });
  }

  deleteSymptom(id: string): Observable<responseModel> {
    return this.http.delete<responseModel>(env.URL_API + env.endpoints.symptom_delete + `/${id}`, {
      headers: this.headers,
    });
  }

  // table
  get symptoms$() { return this._symptoms$.asObservable(); }
}
