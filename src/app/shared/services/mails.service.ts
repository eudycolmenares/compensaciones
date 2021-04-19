import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MailsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private http: HttpClient,
  ) { }

  sendMail(body: any): Observable<any> {
    return this.http.put<any>(
      env.endpoints.NotificationsEmail.url + env.endpoints.NotificationsEmail.endpoints.sendMail,
      body,
      { headers: this.headers }
    );
  }
}
