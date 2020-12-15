import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

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
  // table
  _settings$ = new BehaviorSubject<settingModel[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  createSetting(body: requestModel): Observable<responseModel> {
    return this.http.post<responseModel>(env.URL_API + env.endpoints.settings_create, body, {
      headers: this.headers,
    });
  }

  updateSetting(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.URL_API + env.endpoints.settings_update, body, {
      headers: this.headers,
    });
  }

  deleteSetting(id: string): Observable<responseModel> {
    return this.http.delete<responseModel>(env.URL_API + env.endpoints.settings_delete + `/${id}`, {
      headers: this.headers,
    });
  }

  allSettings(): void {
    this.http.get<settingsApiModel>(env.URL_API + env.endpoints.settings_all, {
      headers: this.headers,
    }).pipe(
      tap(data => this._settings$.next(data.Settings.Setting))
    ).subscribe();
  }

  // table
  get settings$() { return this._settings$.asObservable(); }
  //
}
