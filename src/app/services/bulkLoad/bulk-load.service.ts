import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  BulkLoadApiModel,
  GeneralResponse,
  BulkLoadRequestModel,
} from '../../models/bulk-load'

@Injectable({
  providedIn: 'root'
})
export class BulkLoadService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private _http: HttpClient) { }

  allBulkLoad(selectType: string) {
    return this._http.get<BulkLoadApiModel>(
      env.urlApi_bulkLoad + env.endpoints.bulk_load_read + `/${selectType.toLowerCase()}`,
      {
        headers: this.headers,
      }
    );
  }

  createBulkLoad(body: BulkLoadRequestModel): Observable<GeneralResponse> {  
    return this._http.post<GeneralResponse>(
      env.urlApi_bulkLoad + env.endpoints.bulk_load_create,
      body,
      {
        headers: this.headers,
      }
    );
  }
}
