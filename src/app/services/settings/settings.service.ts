import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment as env } from 'src/environments/environment';
import { responseSettingsModel as responseModel } from '../../models/settings';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  // urlApi: string = environment.URL_API;
  // urlCauses: string = 'CausesService/';
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  createSetting(body): Observable<responseModel> {
    console.log('createSetting() ', body);

    return this.http.post<responseModel>(env.URL_API + env.endpoints.settings_create, body, {
      headers: this.headers,
    });
  }
}
