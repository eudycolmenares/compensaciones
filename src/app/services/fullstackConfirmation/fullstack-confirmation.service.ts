import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FullstackConfirmationsApiModel, RequestModel, ResponseModel } from '@models/fullstack-confirmation';
import { environment as env } from 'src/environments/environment';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})
export class FullstackConfirmationService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(private _http: HttpClient) {}

  allFullstackConfirmations() {
    return this._http.get<FullstackConfirmationsApiModel>(
      env.endpoints.FullstackConfirmation.url + env.endpoints.FullstackConfirmation.endpoints.readall,
      {
        headers: this.headers,
      }
    );
  }

  createFullstackConfirmation(body: RequestModel): Observable<ResponseModel> {
    return this._http.post<any>(
      env.endpoints.FullstackConfirmation.url + env.endpoints.FullstackConfirmation.endpoints.create,
      body,
      {
        headers: this.headers,
      }
    );
  }

  updateFullstackConfirmation(body: RequestModel): Observable<FullstackConfirmationsApiModel> {
    return this._http.put<FullstackConfirmationsApiModel>(
      env.endpoints.FullstackConfirmation.url + env.endpoints.FullstackConfirmation.endpoints.update,
      body,
      {
        headers: this.headers,
      }
    );
  }

  deleteFullstackConfirmation(FullstackConfirmationId: string): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(
      env.endpoints.FullstackConfirmation.url + env.endpoints.FullstackConfirmation.endpoints.delete + `${FullstackConfirmationId}`
    );
  }
}
