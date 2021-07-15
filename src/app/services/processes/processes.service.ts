import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class ProcessesService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(
    private http: HttpClient,
  ) { }

  runNodesRules(body): Observable<any> {
    return this.http.post<any>(env.endpoints.SupervisionProcess.endpoints.nodesRules,
      body,
      { headers: this.headers }
    );
  }

  runBusinessRules(body): Observable<any> {
    return this.http.post<any>(env.endpoints.SupervisionProcess.endpoints.businessRule,
      body,
      { headers: this.headers }
    );
  }

  confirmBillingFiles(body): Observable<any> {
    return this.http.post<any>(env.endpoints.SupervisionProcess.endpoints.billingFiles,
      body,
      { headers: this.headers }
    );
  }

  ConsolidationAccountsNodes(body): Observable<any> {
    return this.http.post<any>(env.endpoints.SupervisionProcess.endpoints.consolidateNodes,
      body,
      { headers: this.headers }
    );
  }
}
