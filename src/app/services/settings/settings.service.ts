import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  responseSettingsModel as responseModel,
  requestSettingsModel as requestModel,
  settingsApiModel,
  settingModel
} from '../../models/settings';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private http: HttpClient,
  ) { }

  allSettings(): Observable<responseModel> {
    return this.http.get<settingsApiModel>(env.endpoints.Settings.url + env.endpoints.Settings.endpoints.readall, { headers: this.headers });
  }

  createSetting(body: requestModel): Observable<responseModel> {
    return this.http.post<responseModel>(env.endpoints.Settings.url + env.endpoints.Settings.endpoints.create, body, {
      headers: this.headers,
    });
  }

  updateSetting(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.endpoints.Settings.url + env.endpoints.Settings.endpoints.update, body, {
      headers: this.headers,
    });
  }

  deleteSetting(id: string): Observable<responseModel> {
    return this.http.delete<responseModel>(env.endpoints.Settings.url + env.endpoints.Settings.endpoints.delete + `${id}`, {
      headers: this.headers,
    });
  }
}
