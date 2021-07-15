import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { ResponseLoginModel } from '../../models/users';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(private http: HttpClient) { }

  login(body): Observable<ResponseLoginModel> {
    return this.http.put<ResponseLoginModel>(
      env.endpoints.User.url + env.endpoints.User.endpoints.login,
      body,
      { headers: this.headers }
    );
  }
}
