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
    return this.http.get<responseModel>(env.urlApi_rentsRR + env.endpoints.accounts_rents_all, { headers: this.headers });
  }

  createAccountRent(body: requestModel): Observable<responseModel> {
    return this.http.post<responseModel>(env.urlApi_rentsRR + env.endpoints.account_rent_create, body, {
      headers: this.headers,
    });
  }

  updateAccount(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.urlApi_rentsRR + env.endpoints.account_rent_update, body, {
      headers: this.headers,
    });
  }

  deleteAccount(id): Observable<responseModel> {
    return this.http.delete<responseModel>(env.urlApi_rentsRR + env.endpoints.account_rent_delete + `/${id}`, {
      headers: this.headers,
    });
  }
}
