import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { faultsApiModel } from '../../models/faults';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class FaultsService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(private http: HttpClient) { }

  loadFaults(body): Observable<faultsApiModel> {
    return this.http.post<faultsApiModel>(env.endpoints.Faults.url + env.endpoints.Faults.endpoints.load, body, {
      headers: this.headers,
    });
  }

  readByIdFaults(id): Observable<faultsApiModel> {
    return this.http.get<faultsApiModel>(env.endpoints.Faults.url + env.endpoints.Faults.endpoints.readid + `${id}`, {
      headers: this.headers,
    });
  }

  readAllFaults(): Observable<faultsApiModel> {
    return this.http.get<faultsApiModel>(env.endpoints.Faults.url + env.endpoints.Faults.endpoints.readall, {
      headers: this.headers,
    });
  }

  readFileSent_Errors(id: number): Observable<faultsApiModel> {
    return this.http.get<faultsApiModel>(env.endpoints.Faults.url + env.endpoints.Faults.endpoints.readid + `${id}`, {
      headers: this.headers,
    });
  }
}
