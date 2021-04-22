import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  NodesValidationApiModel,
  ResponseModel,
  RequestModel
} from '../../models/nodes-validation';

@Injectable({
  providedIn: 'root',
})
export class NodesValidationService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private _http: HttpClient) {}

  allNodesValidation(): Observable<NodesValidationApiModel> {
    return this._http.get<NodesValidationApiModel>(
      env.NodesValidation.url + env.NodesValidation.endpoints.readAll,
      {
        headers: this.headers,
      }
    );
  }

  allApprovedNodes(): Observable<NodesValidationApiModel> {
    return this._http.get<NodesValidationApiModel>(
      env.NodesValidation.url + env.NodesValidation.endpoints.readAllApproved,
      {
        headers: this.headers,
      }
    );
  }

  allRejectedNodes(): Observable<NodesValidationApiModel> {
    return this._http.get<NodesValidationApiModel>(
      env.NodesValidation.url + env.NodesValidation.endpoints.readAllRejected,
      {
        headers: this.headers,
      }
    );
  }

  updateNodeValidation(body: RequestModel): Observable<ResponseModel> {
    return this._http.put<ResponseModel>(
      env.NodesValidation.url + env.NodesValidation.endpoints.update,
      body,
      {
        headers: this.headers,
      }
    );
  }
}
