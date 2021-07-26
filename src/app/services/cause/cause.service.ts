import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  RequestModel,
  CausesApiModel,
  ResponseModel,
} from '../../models/cause';
import {
  paramsHttp,
  paramsUrlBus
} from '../../libraries/utilities.library';
import { GeneralFunctionsService } from '../general-functions.service';

@Injectable({
  providedIn: 'root',
})
export class CauseService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(
    private _http: HttpClient,
    private gnrSvc: GeneralFunctionsService,
  ) {}

  allCauses() {
    return this._http.get<CausesApiModel>(
      env.endpoints.Cause.url + env.endpoints.Cause.endpoints.readall +
      '?' + this.gnrSvc.convertObjectToStringParamsUrl(paramsUrlBus),
      {
        headers: this.headers,
      }
    );
  }

  createCause(body: RequestModel): Observable<ResponseModel> {
    return this._http.post<any>(
      env.endpoints.Cause.url + env.endpoints.Cause.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateCause(body: RequestModel): Observable<CausesApiModel> {    
    return this._http.put<CausesApiModel>(
      env.endpoints.Cause.url + env.endpoints.Cause.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteCause(causeId: string): Observable<ResponseModel> {
    const params = {...paramsUrlBus, 'causeId': causeId};
    return this._http.delete<ResponseModel>(
      env.endpoints.Cause.url +
      env.endpoints.Cause.endpoints.delete +
      '?' + this.gnrSvc.convertObjectToStringParamsUrl(params)
    );
  }
}
