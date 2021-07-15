import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { 
  responseAccountsModel,
  requestAccountsModel,
  responseAccount
} from '../../models/accoaunts';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})
export class ValidationAccountsService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(private http: HttpClient) { }

  allValidationAccounts(): Observable<responseAccountsModel> {
    return this.http.get<responseAccountsModel>(
      env.endpoints.ValidationAccounts.url + env.endpoints.ValidationAccounts.endpoints.readall,
      { headers: this.headers }
    );
  }

  createAccount(body: requestAccountsModel): Observable<responseAccount> {
    return this.http.post<responseAccount>(
      env.endpoints.ValidationAccounts.url + env.endpoints.ValidationAccounts.endpoints.create, 
      body,
      { headers: this.headers }
    );
  }

  updateAccount(body: requestAccountsModel): Observable<responseAccount> {
    return this.http.put<responseAccount>(
      env.endpoints.ValidationAccounts.url + env.endpoints.ValidationAccounts.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteAccount(id: number): Observable<responseAccount> {
    return this.http.delete<responseAccount>(
      env.endpoints.ValidationAccounts.url + env.endpoints.ValidationAccounts.endpoints.delete + `/${id}`,
      { headers: this.headers }
    );
  }
}
