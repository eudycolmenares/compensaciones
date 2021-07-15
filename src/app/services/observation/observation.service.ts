import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  responseObservationModel as responseModel,
  requestObservationModel as requestModel
} from '../../models/observation';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class ObservationService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);

  constructor(private http: HttpClient) { }

  allObservation(): Observable<responseModel> {
    return this.http.get<responseModel>(
      env.endpoints.Observation.url + env.endpoints.Observation.endpoints.readall,
      { headers: this.headers }
    );
  }

  createObservation(body: requestModel): Observable<responseModel> {
    return this.http.post<responseModel>(
      env.endpoints.Observation.url + env.endpoints.Observation.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateObservation(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(
      env.endpoints.Observation.url + env.endpoints.Observation.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteObservation(id: number): Observable<responseModel> {
    return this.http.delete<responseModel>(
      env.endpoints.Observation.url + env.endpoints.Observation.endpoints.delete + `${id}`,
      { headers: this.headers }
    );
  }
}
