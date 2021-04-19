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
    return this.http.post<any>(env.endpoints.SupervisionProcess.endpoints.nodesRules, {
      headers: this.headers,
    });
  }

  runBusinessRules(): Observable<any> {
    return this.http.post<any>(env.endpoints.SupervisionProcess.endpoints.businessRule, {
      headers: this.headers,
    });
  }

  confirmBillingFiles(): Observable<any> {
    return this.http.post<any>(env.endpoints.SupervisionProcess.endpoints.billingFiles, {
      headers: this.headers,
    });
  }

  ConsolidationAccountsNodes(): Observable<any> {
    return this.http.post<any>(env.endpoints.SupervisionProcess.endpoints.consolidateNodes, {
      headers: this.headers,
    });
  }
}
