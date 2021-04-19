import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationAccountsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  allValidationAccounts(): Observable<any> {
    return this.http.get<any>(
      env.endpoints.ValidationAccounts.url + env.endpoints.ValidationAccounts.endpoints.readall,
      { headers: this.headers }
    );
  }
}
