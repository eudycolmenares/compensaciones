import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProcessesService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private http: HttpClient,
  ) { }

  runNodesRules(): Observable<any> {
    return this.http.post<any>(env.urlApi_rules + env.endpoints.nodes_rules, {
      headers: this.headers,
    });
  }

  runBusinessRules(): Observable<any> {
    return this.http.post<any>(env.urlApi_Businessrules + env.endpoints.business_rules, {
      headers: this.headers,
    });
  }

  confirmBillingFiles(): Observable<any> {
    return this.http.post<any>(env.urlApi_BillingFiles + env.endpoints.billing_files, {
      headers: this.headers,
    });
  }

  ConsolidationAccountsNodes(): Observable<any> {
    return this.http.post<any>(env.urlApi_ConsolidationAccNod + env.endpoints.consolidate_account_nodes, {
      headers: this.headers,
    });
  }
}
