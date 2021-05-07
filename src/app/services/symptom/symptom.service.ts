import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { requestModel, symptomsApiModel, responseModel } from '../../models/symptom';

@Injectable({
  providedIn: 'root'
})

export class SymptomService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  allSymptoms(): Observable<symptomsApiModel> {
    return this.http.get<symptomsApiModel>(env.endpoints.Symptom.url + env.endpoints.Symptom.endpoints.readall, { headers: this.headers });
  }

  createSymptom(body: requestModel): Observable<responseModel> {
    return this.http.post<responseModel>(env.endpoints.Symptom.url + env.endpoints.Symptom.endpoints.create, body, {
      headers: this.headers,
    });
  }

  updateSymptom(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.endpoints.Symptom.url + env.endpoints.Symptom.endpoints.update, body, {
      headers: this.headers,
    });
  }

  deleteSymptom(id: number): Observable<responseModel> {
    return this.http.delete<responseModel>(env.endpoints.Symptom.url + env.endpoints.Symptom.endpoints.delete + `${id}`, {
      headers: this.headers,
    });
  }
}
