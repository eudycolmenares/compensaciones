import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class MailsService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

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
