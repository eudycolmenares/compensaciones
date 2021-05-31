import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import * as models from '../../models/rr-compensated-accounts';

@Injectable({
  providedIn: 'root',
})
export class RrCompensatedAccountsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private _http: HttpClient) {}

  /////////////////////////////////////////////////////////////////
  structureCompensationDetails() {
    return {
      structure: [
      {
        name: 'date',
        description: 'Fecha',
        validation: '',
      },
      {
        name: 'account',
        description: 'Cuenta',
        validation: '',
      },
      {
        name: 'productName',
        description: 'Nombre Producto',
        validation: '',
      },
      {
        name: 'trfPqrWarning',
        description: 'Trf Pqr aviso',
        validation: '',
      },
      {
        name: 'serviceDescription',
        description: 'Desc Servicio',
        validation: '',
      },
      {
        name: 'serviceName',
        description: 'Nom Servicio',
        validation: '',
      },
      {
        name: 'lastRentDate',
        description: 'Fecha Ult Renta',
        validation: '',
      },
      {
        name: 'categoryDescription',
        description: 'Desc Categoria',
        validation: '',
      },
      {
        name: 'averangeDefValue',
        description: 'Valor Def Promedio',
        validation: '',
      },
      {
        name: 'compesationValue',
        description: 'Valor Compensación',
        validation: '',
      },
      {
        name: 'compensationCode',
        description: 'Cod Compensación',
        validation: '',
      },
      {
        name: 'ticketNumber',
        description: 'Num Ticket',
        validation: '',
      },
    ],
    columNames: {
      english: ['date', 'account', 'productName', 'trfPqrWarning', 'serviceDescription', 'serviceName', 'lastRentDate', 'categoryDescription', 'averangeDefValue', 'compesationValue', 'compensationCode', 'ticketNumber'],
      spanish: ['FECHA', 'CUENTA', 'NOMBRE_PRODUCTO', 'TRF_PQR_AVISO', 'DESC_SERVICIO', 'NOM_SERVICIO', 'FECHA_ULT_RENTA', 'DESC_CATEGORIA', 'VALOR_DEF_PROMEDIO', 'VALOR_COMPENSACION', 'COD_COMPENSACION', 'NUM_TICKET'],
    },
  };
}

  structureRequest_CompensationDetail(
    dataForm: any
  ): models.CompensationDetailRequestModel {
    let dataRequest: models.CompensationDetailRequestModel = {
      CompensationDetail: {
        id: dataForm.id,
        account: dataForm.account,
        categoryDescription: dataForm.categoryDescription,
        serviceName: dataForm.serviceName,
        serviceDescription: dataForm.serviceDescription,
        productName: dataForm.productName,
        trfPqrWarning: dataForm.trfPqrWarning,
        ticketNumber: dataForm.ticketNumber,
        date: dataForm.date,
        lastRentDate: dataForm.lastRentDate,
        compensationCode: dataForm.compensationCode,
        averangeDefValue: dataForm.averangeDefValue,
        compesationValue: dataForm.compesationValue,
      },
    };
    return dataRequest;
  }

  allCompensationDetails(): Observable<models.CompensationDetailsApiModel> {
    return this._http.get<models.CompensationDetailsApiModel>(
      env.endpoints.CompensationDetail.url + env.endpoints.CompensationDetail.endpoints.readall,
      { headers: this.headers }
    );
  }

  createRequest_CompensationDetail(
    body: models.CompensationDetailModel
  ): Observable<models.ResponseModel> {
    return this._http.post<models.ResponseModel>(
      env.endpoints.CompensationDetail.url + env.endpoints.CompensationDetail.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_CompensationDetail(
    body: models.CompensationDetailModel
  ): Observable<models.ResponseModel> {
    return this._http.put<models.ResponseModel>(
      env.endpoints.CompensationDetail.url + env.endpoints.CompensationDetail.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_CompensationDetail(
    id: string
  ): Observable<models.ResponseModel> {
    return this._http.delete<models.ResponseModel>(
      env.endpoints.CompensationDetail.url +
      env.endpoints.CompensationDetail.endpoints.delete + `${id}`,
      { headers: this.headers }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureTotalCompensation() {
    return {
      structure: [
      {
        name: 'account',
        description: 'Cuenta',
        validation: '',
      },
      {
        name: 'compensationcode',
        description: 'Cod Compensación',
        validation: '',
      },
      {
        name: 'compensationValue',
        description: 'Valor Compensación',
        validation: '',
      },
      {
        name: 'date',
        description: 'Fecha',
        validation: '',
      },
    ],
    columNames: {
      english: ['account', 'compensationcode', 'compensationValue', 'date'],
      spanish: ['CUENTA', 'COD_COMPENSACION', 'VALOR_COMPENSACION', 'FECHA'],
    },
  };
}

  structureRequest_TotalCompensation(
    dataForm: any
  ): models.TotalCompensationRequestModel {
    let dataRequest: models.TotalCompensationRequestModel = {
      TblTotalCompensation: {
        idTotalCompensation: dataForm.id,
        account: dataForm.account,
        compensationValue: dataForm.compensationValue,
        compensationcode: dataForm.compensationcode,
        date: dataForm.date.replaceAll('-',''),
      },
    };
    return dataRequest;
  }

  allTotalCompensation(): Observable<models.TotalCompensationApiModel> {
    return this._http.get<models.TotalCompensationApiModel>(
      env.endpoints.TotalCompensation.url + env.endpoints.TotalCompensation.endpoints.readall,
      { headers: this.headers }
    );
  }

  createRequest_TotalCompensation(body: models.TotalCompensationModel): Observable<models.ResponseModel> {
    return this._http.post<models.ResponseModel>(
      env.endpoints.TotalCompensation.url + env.endpoints.TotalCompensation.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_TotalCompensation(
    body: models.TotalCompensationModel
  ): Observable<models.ResponseModel> {
    return this._http.put<models.ResponseModel>(
      env.endpoints.TotalCompensation.url + env.endpoints.TotalCompensation.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_TotalCompensation(id: string): Observable<models.ResponseModel> {
    return this._http.delete<models.ResponseModel>(
      env.endpoints.TotalCompensation.url + env.endpoints.TotalCompensation.endpoints.delete + `${id}`,
      { headers: this.headers }
    );
  }

  /////////////////////////////////////////////////////////////////

  structureCompensationNotes() {
    return {
      structure: [
      {
        name: 'account',
        description: 'Cuenta',
        validation: '',
      },
      {
        name: 'note',
        description: 'Nota',
        validation: '',
      },
    ],
    columNames: {
      english: ['account', 'note'],
      spanish: ['CUENTA', 'NOTA'],
    },
  };
}

  structureRequest_CompensationNote(
    dataForm: any
  ): models.CompensationNoteRequestModel {
    let dataRequest: models.CompensationNoteRequestModel = {
      TblCompensationNote: {
        compensationNoteId: dataForm.id,
        account: dataForm.account,
        note: dataForm.note,
      },
    };
    return dataRequest;
  }

  allCompensationNotes(): Observable<models.CompensationNotesApiModel> {
    return this._http.get<models.CompensationNotesApiModel>(
      env.endpoints.CompensationNote.url + env.endpoints.CompensationNote.endpoints.readall,
      {
        headers: this.headers,
      }
    );
  }

  createRequest_CompensationNote(
    body: models.CompensationNoteModel
  ): Observable<models.ResponseModel> {
    return this._http.post<models.ResponseModel>(
      env.endpoints.CompensationNote.url + env.endpoints.CompensationNote.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateRequest_CompensationNote(
    body: models.CompensationNoteModel
  ): Observable<models.ResponseModel> {
    return this._http.put<models.ResponseModel>(
      env.endpoints.CompensationNote.url + env.endpoints.CompensationNote.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteRequest_CompensationNote(id: number): Observable<models.ResponseModel> {
    return this._http.delete<models.ResponseModel>(
      env.endpoints.CompensationNote.url + env.endpoints.CompensationNote.endpoints.delete + `${id}`,
      { headers: this.headers }
    );
  }

  allCompensationValue(): Observable<any> {
    return this._http.get<any>(
      env.endpoints.BillingSupervision.url + env.endpoints.BillingSupervision.endpoints.compensationValue,
      {
        headers: this.headers,
      }
    );
  }
}
