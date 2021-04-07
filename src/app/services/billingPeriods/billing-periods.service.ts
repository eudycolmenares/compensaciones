import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  BillingPeriodsApiModel,
  ResponseModel,
  RequestModel,
} from '../../models/billing-periods';
import { GeneralFunctionsService } from '../../services/general-functions.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class BillingPeriodsService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Content-Type': 'application/json; charset=utf-8',
  });

  currentPeriod = [];

  constructor(
    private _http: HttpClient,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
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
        const DataNumber = this.currentPeriod.length;
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
            return this.actionSelected(action, body);
          }
        });
      } else {
        return this.actionSelected(action, body);
      }
    });
  }

  actionSelected(action, body): Promise<ResponseModel> {
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
      return this.delete(body['TblBillingPeriods']['pediodId']).then((res) => {
        console.log('respuesta final de creacion ', res);
        return res;
      });
    }
  }

  create(body: RequestModel): Promise<ResponseModel> {
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

  update(body: RequestModel): Promise<ResponseModel> {
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
