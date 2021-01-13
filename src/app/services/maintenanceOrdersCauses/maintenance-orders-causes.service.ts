import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  MOCausesApiModel,
  MOCausesModel,
} from '../../models/maintenance-orders-causes';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceOrdersCausesService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });
  
  constructor(private _http: HttpClient) {}

  allMaintenanceOrdersCauses() {
  }
}
