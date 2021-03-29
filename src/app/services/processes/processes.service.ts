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

  // 100.126.19.74:7669
  // http://localhost:7001/WSCompensaciones-web/webresources/WSNodesRules/ NodesRulesService/run
  runNodesRules(): Observable<any> {
    return this.http.post<any>(env.urlApi_rules + env.endpoints.nodes_rules, {
      headers: this.headers,
    });
  }
}
