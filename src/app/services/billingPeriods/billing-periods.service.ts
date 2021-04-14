import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  BillingPeriodsApiModel,
  ResponseModel,
  RequestModel,
  BillingPeriodModel,
} from '../../models/billing-periods';
import { GeneralFunctionsService } from '../../services/general-functions.service';

@Injectable({
  providedIn: 'root',
})
export class BillingPeriodsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  listPeriod: BillingPeriodModel[] = [];
  currentPeriod: BillingPeriodModel[] = [];

  constructor(
    private _http: HttpClient,
    private _gnrScv: GeneralFunctionsService
  ) {}

  allBillingPeriods(): Observable<BillingPeriodsApiModel> {
    return this._http.get<BillingPeriodsApiModel>(
      env.BillingPeriods.url + env.BillingPeriods.endpoints.readAll,
      {
        headers: this.headers,
      }
    );
  }

  validationBillingPeriods(): Promise<any> {
    const promise = new Promise((resol, reject) => {
      const dateNow = new Date().setHours(0, 0, 0, 0);
      this.allBillingPeriods().subscribe((resp: BillingPeriodsApiModel) => {
        this.listPeriod = resp.tblBillingPeriods;
        this.currentPeriod = resp.tblBillingPeriods.filter(
          (data) =>
            dateNow >=
              this._gnrScv
                .formatDate_billingPeriods(data.startDate)
                .setHours(0, 0, 0, 0) &&
            dateNow <=
              this._gnrScv
                .formatDate_billingPeriods(data.endDate)
                .setHours(23, 59, 59, 999)
        );
        let DataNumber = this.currentPeriod.length;
        if (DataNumber > 0) {
          resol({
            exists: true,
            message: 'Existe un periodo de facturación en curso',
            currentPeriod: this.currentPeriod[DataNumber - 1],
          });
        } else {
          resol({
            exists: false,
            message: 'No existe un periodo de facturación en curso',
            currentPeriod: this.currentPeriod,
          });
        }
      });
    });
    return promise;
  }

  // is created not to re-launch validationBillingPeriods()
  submitCurrentBillingPeriod () {
    let DataNumber = this.currentPeriod.length;
    if (DataNumber > 0) {
    return this.currentPeriod[DataNumber - 1].periodId;}
    else {
      return null;
    }
  }

  validationBillingPeriodsBetween(
    startDate: string | Date,
    endDate: string | Date
  ): Promise<any> {
    console.log('datos segunda validacion', startDate, endDate);

    const promise = new Promise((resol) => {
      let dataFilter = this.currentPeriod.filter(
        (data) =>
          (this._gnrScv
            .formatDate_billingPeriods(data.startDate)
            .setHours(0, 0, 0, 0) >=
            this._gnrScv
              .formatDate_billingPeriods(startDate)
              .setHours(0, 0, 0, 0) &&
            this._gnrScv
              .formatDate_billingPeriods(data.startDate)
              .setHours(0, 0, 0, 0) <=
              this._gnrScv
                .formatDate_billingPeriods(endDate)
                .setHours(23, 59, 59, 999)) ||
          (this._gnrScv
            .formatDate_billingPeriods(data.endDate)
            .setHours(0, 0, 0, 0) >=
            this._gnrScv
              .formatDate_billingPeriods(startDate)
              .setHours(0, 0, 0, 0) &&
            this._gnrScv
              .formatDate_billingPeriods(data.endDate)
              .setHours(0, 0, 0, 0) <=
              this._gnrScv
                .formatDate_billingPeriods(endDate)
                .setHours(23, 59, 59, 999))
      );
      const DataNumber = dataFilter.length;
      console.log('DataNumber - dataFilter', dataFilter);

      if (DataNumber > 0) {
        resol({
          exists: true,
          generalResponse: {
            code: '-1',
            messageCode:
              'No se puede eliminar, modificar, crear porque esta en curso este periodo de facturación',
            descriptionCode: 'Periodo de facturación en curso',
          },
          currentPeriod: this.currentPeriod[DataNumber - 1],
        });
      } else {
        resol({
          exists: false,
          message: 'No existe un periodo de facturación en curso',
          currentPeriod: this.currentPeriod,
        });
      }
    });
    return promise;
  }

  validationBillingPeriodsExist(
    startDate: string | Date,
    endDate: string | Date,
    periodId: number
  ): Promise<any> {
    console.log('datos tercera validacion', startDate, endDate);

    const promise = new Promise((resol) => {
      let dataFilter = this.listPeriod.filter(
        (data) =>
          ((this._gnrScv
            .formatDate_billingPeriods(data.startDate)
            .setHours(0, 0, 0, 0) >=
            this._gnrScv
              .formatDate_billingPeriods(startDate)
              .setHours(0, 0, 0, 0) &&
            this._gnrScv
              .formatDate_billingPeriods(data.startDate)
              .setHours(0, 0, 0, 0) <=
              this._gnrScv
                .formatDate_billingPeriods(endDate)
                .setHours(23, 59, 59, 999)) ||
          (this._gnrScv
            .formatDate_billingPeriods(data.endDate)
            .setHours(0, 0, 0, 0) >=
            this._gnrScv
              .formatDate_billingPeriods(startDate)
              .setHours(0, 0, 0, 0) &&
            this._gnrScv
              .formatDate_billingPeriods(data.endDate)
              .setHours(0, 0, 0, 0) <=
              this._gnrScv
                .formatDate_billingPeriods(endDate)
                .setHours(23, 59, 59, 999))) &&
                (data.periodId !== periodId)
      );
      const DataNumber = dataFilter.length;
      console.log('DataNumber - dataFilter', dataFilter);

      if (DataNumber > 0) {
        console.log('data filter 2: ', dataFilter);
        
        resol({
          exists: true,
          generalResponse: {
            code: '-1',
            messageCode:
              'Existe un periodo de facturación en este rango de fechas, ' +
              'Periodo: ' +
              dataFilter[DataNumber - 1].periodId +
              ', Fecha inicio: ' +
              dataFilter[DataNumber - 1].startDate +
              ', Fecha fin: ' +
              dataFilter[DataNumber - 1].endDate,
            descriptionCode: 'Existe periodo de facturación creado',
          },
          currentPeriod: dataFilter[DataNumber - 1],
        });
      } else {
        resol({
          exists: false,
          message:
            'No existe un periodo de facturación en este rango de fechas',
          currentPeriod: this.currentPeriod,
        });
      }
    });
    return promise;
  }

  actionsBillingPeriod(
    body: RequestModel,
    action: string
  ): Promise<ResponseModel> {
    let responseValidation: any = this.validationBillingPeriods();

    return responseValidation.then((resp) => {
      console.log('respuesta de validar si existe: ', resp);

      if (resp['exists']) {
        let responseValidationBetween: any = this.validationBillingPeriodsBetween(
          body.TblBillingPeriods.startDate,
          body.TblBillingPeriods.endDate
        );

        return responseValidationBetween.then((response) => {
          if (response['exists']) {
            return response;
          } else {
            console.log(
              'las fechas no estan en el periodo en curso: eliminar, ',
              response
            );

            return this.actionSelected(action, body);
          }
        });
      } else {
        return this.actionSelected(action, body);
      }
    });
  }

  actionSelected(action, body): Promise<ResponseModel> {
    console.log('action', action);
    console.log('body', body);

    if (action === 'create') {
      return this.create(body).then((res) => {
        return res;
      });
    } else if (action === 'update') {
      return this.update(body).then((res) => {
        console.log('respuesta final de creacion ', res);
        return res;
      });
    } else if (action === 'delete') {
      return this.delete(body.TblBillingPeriods.periodId).then((res) => {
        console.log('respuesta final de creacion ', res);
        return res;
      });
    }
  }

  create(body: RequestModel): Promise<ResponseModel> {
    let responseValidationExist: any = this.validationBillingPeriodsExist(
      body.TblBillingPeriods.startDate,
      body.TblBillingPeriods.endDate,
      body.TblBillingPeriods.periodId
    );

    return responseValidationExist.then((response) => {
      if (response['exists']) {
        return response;
      } else {
        return this._http
          .post<ResponseModel>(
            env.BillingPeriods.url + env.BillingPeriods.endpoints.create,
            body,
            {
              headers: this.headers,
            }
          )
          .toPromise();
      }
    });
  }

  update(body: RequestModel): Promise<ResponseModel> {
    let responseValidationExist: any = this.validationBillingPeriodsExist(
      body.TblBillingPeriods.startDate,
      body.TblBillingPeriods.endDate,
      body.TblBillingPeriods.periodId
    );

    return responseValidationExist.then((response) => {
      console.log('enviado: ', body.TblBillingPeriods.periodId);
      console.log('comparado: ', response.currentPeriod.periodId);
      console.log((body.TblBillingPeriods.periodId !== response.currentPeriod.periodId));
      console.log((body.TblBillingPeriods.periodId === response.currentPeriod.periodId));
      console.log(response['exists'] && (body.TblBillingPeriods.periodId !== response.currentPeriod.periodId) );
      
      
      if (response['exists'] ) {
        return response;
        
      } else {
        return this._http
          .put<ResponseModel>(
            env.BillingPeriods.url + env.BillingPeriods.endpoints.update,
            body,
            {
              headers: this.headers,
            }
          )
          .toPromise();
      }
    });
  }

  delete(periodId: number): Promise<ResponseModel> {
    console.log('periodId', periodId);

    return this._http
      .delete<ResponseModel>(
        env.BillingPeriods.url +
          env.BillingPeriods.endpoints.delete +
          `/${periodId}`,
        {
          headers: this.headers,
        }
      )
      .toPromise();
  }
}
