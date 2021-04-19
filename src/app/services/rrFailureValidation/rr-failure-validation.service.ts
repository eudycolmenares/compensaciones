import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import * as models from '../../models/rr-failure-validation';

@Injectable({
  providedIn: 'root',
})
export class RrFailureValidationService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) {}

  private convertSelectedServices_string (arrayServices: []) {
    let arrayServices_modified = [];
    for (const iterator of arrayServices) {
      arrayServices_modified.push(iterator['value'])
    }

    return arrayServices_modified.join(',');
  }

  /////////////////////////////////////////////////////////////////

  structureIntTelNodes48H() {
    return {
      structure: [
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
          validation: 'time-min',
        },
        {
          name: 'service',
          description: 'Servicio',
          validation: '',
        },
      ],
      columNames: {
        english: ['issue', 'node', 'cause', 'time', 'service'],
        spanish: ['INCIDENTE', 'NODO', 'CAUSA', 'DURACIÓN FALLA', 'SERVICIO'],
      },
    };
  }

  allIntTelNodes48H(): Observable<models.IntTelNodes48HApiModel> {
    return this.http.get<models.IntTelNodes48HApiModel>(
      env.endpoints.ValidationIntTelNode48H.url + env.endpoints.ValidationIntTelNode48H.endpoints.readall,
      { headers: this.headers }
    );
  }

  structureRequest_IntTelNode48H(
    dataForm: any
  ): models.IntTelNode48HRequestModel {
    let dataRequest: models.IntTelNode48HRequestModel = {
      IntTelNode48H: {
        id: dataForm.id,
        issue: dataForm.issue,
        node: dataForm.node,
        cause: dataForm.cause,
        time: dataForm.time,
        service: this.convertSelectedServices_string(dataForm.service),
      },
    };
    return dataRequest;
  }

  createRequest_IntTelNode48H(
    body: models.IntTelNode48HModel
  ): Observable<models.ResponseModel> {
    return this.http.post<models.ResponseModel>(
      env.endpoints.ValidationIntTelNode48H.url + env.endpoints.ValidationIntTelNode48H.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_IntTelNode48H(body: models.IntTelNode48HModel): Observable<models.ResponseModel> {
    return this.http.put<models.ResponseModel>(
      env.endpoints.ValidationIntTelNode48H.url + env.endpoints.ValidationIntTelNode48H.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_IntTelNode48H(id: string): Observable<models.ResponseModel> {
    return this.http.delete<models.ResponseModel>(
      env.endpoints.ValidationIntTelNode48H.url + env.endpoints.ValidationIntTelNode48H.endpoints.delete + `/${id}`,
      { headers: this.headers }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTvNodes16H() {
    return this.structureIntTelNodes48H();
  }

  allTvNodes16H(): Observable<models.TvNodes16HApiModel> {
    return this.http.get<models.TvNodes16HApiModel>(
      env.endpoints.ValidationTvNode16H.url + env.endpoints.ValidationTvNode16H.endpoints.readall,
      { headers: this.headers }
    );
  }

  structureRequest_TvNode16H(
    dataForm: any
  ): models.TvNode16HRequestModel {
    let dataRequest: models.TvNode16HRequestModel = {
      TvNode16H: {
        id: dataForm.id,
        issue: dataForm.issue,
        node: dataForm.node,
        cause: dataForm.cause,
        time: dataForm.time,
        service: this.convertSelectedServices_string(dataForm.service),
      },
    };
    return dataRequest;
  }

  createRequest_TvNode16H(
    body: models.TvNode16HModel
  ): Observable<models.ResponseModel> {
    return this.http.post<models.ResponseModel>(
      env.endpoints.ValidationTvNode16H.url + env.endpoints.ValidationTvNode16H.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_TvNode16H(body: models.TvNode16HModel): Observable<models.ResponseModel> {
    return this.http.put<models.ResponseModel>(
      env.endpoints.ValidationTvNode16H.url + env.endpoints.ValidationTvNode16H.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_TvNode16H(id: string): Observable<models.ResponseModel> {
    return this.http.delete<models.ResponseModel>(
      env.endpoints.ValidationTvNode16H.url + env.endpoints.ValidationTvNode16H.endpoints.delete + `/${id}`,
      { headers: this.headers }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTvSettings16H() {
    return {
      structure: [
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
          validation: 'time-min',
        },
        {
          name: 'service',
          description: 'Servicio',
          validation: '',
        },
      ],
      columNames: {
        english: ['account', 'call', 'time', 'service'],
        spanish: ['CUENTA', 'LLAMADA', 'TIEMPO', 'SERVICIO'],
      },
    };
  }

  allTvSettings16H(): Observable<models.TvSettings16HApiModel> {
    return this.http.get<models.TvSettings16HApiModel>(
      env.endpoints.ValidationTvSetting16H.url + env.endpoints.ValidationTvSetting16H.endpoints.readall,
      { headers: this.headers }
    );
  }

  structureRequest_TvSetting16H(
    dataForm: any
  ): models.TvSetting16HRequestModel {
    let dataRequest: models.TvSetting16HRequestModel = {
      TvSetting16H: {
        id: dataForm.id,
        account: dataForm.account,
        call: dataForm.call,
        time: dataForm.time,
        service: this.convertSelectedServices_string(dataForm.service),
      },
    };
    return dataRequest;
  }

  createRequest_TvSetting16H(
    body: models.TvSetting16HModel
  ): Observable<models.ResponseModel> {
    return this.http.post<models.ResponseModel>(
      env.endpoints.ValidationTvSetting16H.url + env.endpoints.ValidationTvSetting16H.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_TvSetting16H(body: models.TvSetting16HModel): Observable<models.ResponseModel> {
    return this.http.put<models.ResponseModel>(
      env.endpoints.ValidationTvSetting16H.url + env.endpoints.ValidationTvSetting16H.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_TvSetting16H(id: string): Observable<models.ResponseModel> {
    return this.http.delete<models.ResponseModel>(
      env.endpoints.ValidationTvSetting16H.url + env.endpoints.ValidationTvSetting16H.endpoints.delete + `/${id}`,
      { headers: this.headers }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTelepSettlemCompensas() {
    return this.structureTvSettings16H();
  }

  allTelepSettlemCompensas(): Observable<models.TelepSettlemCompensasApiModel> {
    return this.http.get<models.TelepSettlemCompensasApiModel>(
      env.endpoints.ValidationTelepSettlemCompensas.url + env.endpoints.ValidationTelepSettlemCompensas.endpoints.readall,
      { headers: this.headers }
    );
  }

  structureRequest_TelepSettlemCompensa(
    dataForm: any
  ): models.TelepSettlemCompensaRequestModel {
    let dataRequest: models.TelepSettlemCompensaRequestModel = {
      TblArrangementTelInt48h: {
        idTblArrangementTelInt48h: dataForm.id,
        account: dataForm.account,
        call: dataForm.call,
        time: dataForm.time,
        service: this.convertSelectedServices_string(dataForm.service),
      },
    };
    return dataRequest;
  }

  createRequest_TelepSettlemCompensa(
    body: models.TelepSettlemCompensaModel
  ): Observable<models.ResponseModel> {
    return this.http.post<models.ResponseModel>(
      env.endpoints.ValidationTelepSettlemCompensas.url + env.endpoints.ValidationTelepSettlemCompensas.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_TelepSettlemCompensa(body: models.TelepSettlemCompensaModel): Observable<models.ResponseModel> {
    return this.http.put<models.ResponseModel>(
      env.endpoints.ValidationTelepSettlemCompensas.url + env.endpoints.ValidationTelepSettlemCompensas.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_TelepSettlemCompensa(id: string): Observable<models.ResponseModel> {
    return this.http.delete<models.ResponseModel>(
      env.endpoints.ValidationTelepSettlemCompensas.url + env.endpoints.ValidationTelepSettlemCompensas.endpoints.delete + `/${id}`,
      { headers: this.headers }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTelepCompensas() {
    return {
      structure: [
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
          name: 'time',
          description: 'Tiempo',
          validation: 'time-min',
        },
        {
          name: 'service',
          description: 'Servicio',
          validation: '',
        },
      ],
      columNames: {
        english: ['account', 'incident', 'time', 'service'],
        spanish: ['CUENTA', 'INCIDENTE', 'TIEMPO', 'SERVICIO'],
      },
    };
  }

  allTelepCompensas(): Observable<models.TelepCompensasApiModel> {
    return this.http.get<models.TelepCompensasApiModel>(
      env.endpoints.ValidationTelepCompensa.url + env.endpoints.ValidationTelepCompensa.endpoints.readall,
      { headers: this.headers }
    );
  }

  structureRequest_TelepCompensa(
    dataForm: any
  ): models.TelepCompensaRequestModel {
    let dataRequest: models.TelepCompensaRequestModel = {
      TblCompesTelInt48h: {
        idTblTelIntCompe48h: dataForm.id,
        account: dataForm.account,
        incident: dataForm.incident,
        service: this.convertSelectedServices_string(dataForm.service),
        time: dataForm.time,
      },
    };
    return dataRequest;
  }

  createRequest_TelepCompensa(
    body: models.TelepCompensaModel
  ): Observable<models.ResponseModel> {
    return this.http.post<models.ResponseModel>(
      env.endpoints.ValidationTelepCompensa.url + env.endpoints.ValidationTelepCompensa.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_TelepCompensa(body: models.TelepCompensaModel): Observable<models.ResponseModel> {
    return this.http.put<models.ResponseModel>(
      env.endpoints.ValidationTelepCompensa.url + env.endpoints.ValidationTelepCompensa.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_TelepCompensa(id: string): Observable<models.ResponseModel> {
    return this.http.delete<models.ResponseModel>(
      env.endpoints.ValidationTelepCompensa.url + env.endpoints.ValidationTelepCompensa.endpoints.delete + `/${id}`,
      { headers: this.headers }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTelevCompensas() {
    return this.structureTelepCompensas();
  }

  allTelevCompensas(): Observable<models.TelevCompensasApiModel> {
    return this.http.get<models.TelevCompensasApiModel>(
      env.endpoints.ValidationTelevCompensa.url + env.endpoints.ValidationTelevCompensa.endpoints.readall,
      { headers: this.headers }
    );
  }

  structureRequest_TelevCompensa(
    dataForm: any
  ): models.TelevCompensaRequestModel {
    let dataRequest: models.TelevCompensaRequestModel = {
      TblCompesTv16h: {
        idTblTvCompe16h: dataForm.id,
        account: dataForm.account,
        incident: dataForm.incident,
        service: this.convertSelectedServices_string(dataForm.service),
        time: dataForm.time,
      },
    };
    return dataRequest;
  }

  createRequest_TelevCompensa(
    body: models.TelevCompensaModel
  ): Observable<models.ResponseModel> {
    return this.http.post<models.ResponseModel>(
      env.endpoints.ValidationTelevCompensa.url + env.endpoints.ValidationTelevCompensa.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_TelevCompensa(body: models.TelevCompensaModel): Observable<models.ResponseModel> {
    return this.http.put<models.ResponseModel>(
      env.endpoints.ValidationTelevCompensa.url + env.endpoints.ValidationTelevCompensa.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_TelevCompensa(id: string): Observable<models.ResponseModel> {
    return this.http.delete<models.ResponseModel>(
      env.endpoints.ValidationTelevCompensa.url + env.endpoints.ValidationTelevCompensa.endpoints.delete + `/${id}`,
      { headers: this.headers }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureMassImproperFailures() {
    let dataChange = this.structureTelepCompensas();
    dataChange.columNames.spanish[3] = 'DURACIÓN FALLA';
    return dataChange;
  }

  allMassImproperFailures(): Observable<models.MassImproperFailuresApiModel> {
    return this.http.get<models.MassImproperFailuresApiModel>(
      env.endpoints.ValidationMassImproperFailure.url + env.endpoints.ValidationMassImproperFailure.endpoints.readall,
      { headers: this.headers }
    );
  }

  structureRequest_MassImproperFailure(
    dataForm: any
  ): models.MassImproperFailureRequestModel {
    let dataRequest: models.MassImproperFailureRequestModel = {
      TblImprocedureCompensation: {
        idTblImprocedureCompensation: dataForm.id,
        account: dataForm.account,
        incident: dataForm.incident,
        service: this.convertSelectedServices_string(dataForm.service),
        time: dataForm.time,
      },
    };
    return dataRequest;
  }

  createRequest_MassImproperFailure(
    body: models.MassImproperFailureModel
  ): Observable<models.ResponseModel> {
    return this.http.post<models.ResponseModel>(
      env.endpoints.ValidationMassImproperFailure.url + env.endpoints.ValidationMassImproperFailure.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_MassImproperFailure(body: models.MassImproperFailureModel): Observable<models.ResponseModel> {
    return this.http.put<models.ResponseModel>(
      env.endpoints.ValidationMassImproperFailure.url + env.endpoints.ValidationMassImproperFailure.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_MassImproperFailure(id: string): Observable<models.ResponseModel> {
    return this.http.delete<models.ResponseModel>(
      env.endpoints.ValidationMassImproperFailure.url + env.endpoints.ValidationMassImproperFailure.endpoints.delete + `/${id}`,
      { headers: this.headers }
    );
  }
}
