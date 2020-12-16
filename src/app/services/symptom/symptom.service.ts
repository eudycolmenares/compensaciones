import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { requestModel } from '../../models/symptom';

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
  _settings$ = new BehaviorSubject<any[]>([]); // acomodar

  constructor(private http: HttpClient,) { }

  allSymptoms(): void { // acomodar
    this.http.get<any>(env.URL_API + env.endpoints.symptom_all, {
      headers: this.headers,
    }).pipe(
      tap(data => console.log('allSymptoms()', data) ) // this._settings$.next(data.Settings.Setting)
    ).subscribe();
  }

  createSymptom(body: requestModel): Observable<any> { // responseModel
    return this.http.post<any>(env.URL_API + env.endpoints.symptom_create, body, { // acomodar
      headers: this.headers,
    });
  }
}
