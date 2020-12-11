import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  urlApi: string = environment.URL_API;
  urlCauses: string =
    '/WSCompensaciones-web/webresources/WSCompensaciones/CausesService/';
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });
  constructor(public http: HttpClient) {}

  getCause(id): Observable<any> {
    console.log('llega al service');

    return this.http.get(this.urlApi + this.urlCauses + 'read/id/' + id, {
      headers: this.headers,
    });
  }
}
