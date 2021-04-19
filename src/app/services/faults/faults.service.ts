import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { faultsApiModel } from '../../models/faults';

@Injectable({
  providedIn: 'root'
})

export class FaultsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  loadFaults(body): Observable<faultsApiModel> {
    return this.http.post<faultsApiModel>(env.endpoints.Faults.url + env.endpoints.Faults.endpoints.load, body, {
      headers: this.headers,
    });
  }

  readByIdFaults(id): Observable<faultsApiModel> {
    return this.http.get<faultsApiModel>(env.endpoints.Faults.url + env.endpoints.Faults.endpoints.readid + `/${id}`, {
      headers: this.headers,
    });
  }

  readAllFaults(): Observable<faultsApiModel> {
    return this.http.get<faultsApiModel>(env.endpoints.Faults.url + env.endpoints.Faults.endpoints.readall, {
      headers: this.headers,
    });
  }
}
