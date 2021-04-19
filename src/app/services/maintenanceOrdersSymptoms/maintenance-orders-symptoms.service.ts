import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  ordersSymptomsApiModel as symptomsApiModel,
  responseOrderSymptomModel as responseModel,
  requestOrderSymptomModel as requestModel,
  orderSymptomModel
} from '../../models/maintenance-orders-symptoms';

@Injectable({
  providedIn: 'root'
})

export class MaintenanceOrdersSymptomsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  allOrdersSymptoms(): Observable<symptomsApiModel> {
    return this.http.get<symptomsApiModel>(env.endpoints.OrderSymptoms.url + env.endpoints.OrderSymptoms.endpoints.readall, { headers: this.headers });
  }

  createOrderSymptom(body: requestModel): Observable<responseModel> {
    return this.http.post<responseModel>(env.endpoints.OrderSymptoms.url + env.endpoints.OrderSymptoms.endpoints.create, body, {
      headers: this.headers,
    });
  }

  updateOrderSymptom(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.endpoints.OrderSymptoms.url + env.endpoints.OrderSymptoms.endpoints.update, body, {
      headers: this.headers,
    });
  }

  deleteOrderSymptom(id: number): Observable<responseModel> {
    return this.http.delete<responseModel>(env.endpoints.OrderSymptoms.url + env.endpoints.OrderSymptoms.endpoints.delete + `/${id}`, {
      headers: this.headers
    });
  }
}
