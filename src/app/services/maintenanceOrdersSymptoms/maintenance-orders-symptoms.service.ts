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
    return this.http.get<symptomsApiModel>(env.URL_API + env.endpoints.orders_symptoms_all, { headers: this.headers });
  }

  createOrderSymptom(body: requestModel): Observable<responseModel> {
    return this.http.post<responseModel>(env.URL_API + env.endpoints.order_symptom_create, body, {
      headers: this.headers,
    });
  }

  updateOrderSymptom(body: requestModel): Observable<responseModel> {
    return this.http.put<responseModel>(env.URL_API + env.endpoints.order_symptom_update, body, {
      headers: this.headers,
    });
  }

  deleteOrderSymptom(id: number): Observable<responseModel> {
    return this.http.delete<responseModel>(env.URL_API + env.endpoints.order_symptom_delete + `/${id}`, {
      headers: this.headers
    });
  }
}
