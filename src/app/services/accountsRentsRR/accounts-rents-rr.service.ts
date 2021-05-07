import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  responseAccountsModel as responseModel,
  requestAccountRentModel as requestModel
} from '../../models/accounts-rents-rr';

@Injectable({
  providedIn: 'root'
})
export class AccountsRentsRRService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  allAccounts(): Observable<responseModel> {
    return this.http.get<responseModel>(
      env.endpoints.AccountRent.url + env.endpoints.AccountRent.endpoints.readall,
      { headers: this.headers }
    );
  }
}
