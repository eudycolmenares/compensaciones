import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { NewSymptomsApiModel } from '../../models/new-Symptom';

@Injectable({
  providedIn: 'root'
})
export class NewSymptomService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private _http: HttpClient) {}

  allNewSymptoms(): Observable<NewSymptomsApiModel> {
    return this._http.get<NewSymptomsApiModel>(
      env.endpoints.NewSymptoms.url + env.endpoints.NewSymptoms.endpoints.readAll,
      {
        headers: this.headers,
      }
    );
  }

  runNewSymptoms(): Observable<NewSymptomsApiModel> {
    return this._http.post<NewSymptomsApiModel>(
      env.endpoints.NewSymptoms.url + env.endpoints.NewSymptoms.endpoints.run,
      {
        headers: this.headers,
      }
    );
  }
}
