import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { ResponseLoginModel } from '../../models/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  login(body): Observable<ResponseLoginModel> {
    return this.http.put<ResponseLoginModel>(
      env.urlApi_users + env.endpoints.user_login,
      body,
      { headers: this.headers }
    );
  }
}
