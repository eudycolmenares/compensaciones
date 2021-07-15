import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { NewSymptomsApiModel } from '../../models/new-symptom';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})
export class NewSymptomService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

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
