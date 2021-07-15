import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { NewCausesApiModel } from '../../models/new-cause';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root',
})
export class NewCauseService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(private _http: HttpClient) {}

  allNewCauses(): Observable<NewCausesApiModel> {
    return this._http.get<NewCausesApiModel>(
      env.endpoints.NewCauses.url + env.endpoints.NewCauses.endpoints.readAll,
      {
        headers: this.headers,
      }
    );
  }

  runNewCauses(): Observable<NewCausesApiModel> {
    return this._http.post<NewCausesApiModel>(
      env.endpoints.NewCauses.url + env.endpoints.NewCauses.endpoints.run,
      {
        headers: this.headers,
      }
    );
  }
}
