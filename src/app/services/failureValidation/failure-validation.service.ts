import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import * as models from '../../models/failure-validation';

@Injectable({
  providedIn: 'root',
})
export class FailureValidationService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) {}

  structureIntTelNodes48H() {
    return [
      {
        name: 'issue',
        description: 'Incidente',
        validation: '',
      },
      {
        name: 'node',
        description: 'Nodo',
        validation: '',
      },
      {
        name: 'cause',
        description: 'Causa',
        validation: '',
      },
      {
        name: 'time',
        description: 'Tiempo',
        validation: '',
      },
      {
        name: 'service',
        description: 'Servicio',
        validation: '',
      },
    ];
  }

  columNamesIntTelNodes48H() {
    return [
      {
        english: ['issue', 'node', 'cause', 'time', 'service'],
      },
      {
        spanish: ['INCIDENTE', 'NODO', 'CAUSA', 'DURACIÓN FALLA', 'SERVICIO'],
      },
    ];
  }

  allIntTelNodes48H(): Observable<models.IntTelNodes48HApiModel> {
    return this.http.get<models.IntTelNodes48HApiModel>(
      env.urlApi_failureValidation + env.endpoints.IntTelNodes48H_read,
      {
        headers: this.headers,
      }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTvNodes16H() {
    return this.structureIntTelNodes48H();
  }

  allTvNodes16H(): Observable<models.TvNodes16HApiModel> {
    return this.http.get<models.TvNodes16HApiModel>(
      env.urlApi_failureValidation + env.endpoints.TvNodes16H_read,
      {
        headers: this.headers,
      }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTvSettings16H() {
    return [
      {
        name: 'account',
        description: 'Cuenta',
        validation: '',
      },
      {
        name: 'call',
        description: 'Llamada',
        validation: '',
      },
      {
        name: 'time',
        description: 'Tiempo',
        validation: '',
      },
      {
        name: 'service',
        description: 'Servicio',
        validation: '',
      },
    ];
  }

  allTvSettings16H(): Observable<models.TvSettings16HApiModel> {
    return this.http.get<models.TvSettings16HApiModel>(
      env.urlApi_failureValidation + env.endpoints.TvSettings16H_read,
      {
        headers: this.headers,
      }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTelepSettlemCompensas() {
    return this.structureTvSettings16H();
  }

  allTelepSettlemCompensas(): Observable<models.TelepSettlemCompensasApiModel> {
    return this.http.get<models.TelepSettlemCompensasApiModel>(
      env.urlApi_failureValidation + env.endpoints.TelepSettlemCompensas_read,
      {
        headers: this.headers,
      }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTelepCompensas() {
    return [
      {
        name: 'account',
        description: 'Cuenta',
        validation: '',
      },
      {
        name: 'incident',
        description: 'Incidente',
        validation: '',
      },
      {
        name: 'service',
        description: 'Servicio',
        validation: '',
      },
      {
        name: 'time',
        description: 'Tiempo',
        validation: '',
      },
    ];
  }

  allTelepCompensas(): Observable<models.TelepCompensasApiModel> {
    return this.http.get<models.TelepCompensasApiModel>(
      env.urlApi_failureValidation + env.endpoints.TelepCompensas_read,
      {
        headers: this.headers,
      }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTelevCompensas() {
    return this.structureTelepCompensas();
  }

  allTelevCompensas(): Observable<models.TelevCompensasApiModel> {
    return this.http.get<models.TelevCompensasApiModel>(
      env.urlApi_failureValidation + env.endpoints.TelevCompensas_read,
      {
        headers: this.headers,
      }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureMassImproperFailures() {
    return this.structureTelepCompensas();
  }

  allMassImproperFailures(): Observable<models.MassImproperFailuresApiModel> {
    return this.http.get<models.MassImproperFailuresApiModel>(
      env.urlApi_failureValidation + env.endpoints.MassImproperFailures_read,
      {
        headers: this.headers,
      }
    );
  }
}
