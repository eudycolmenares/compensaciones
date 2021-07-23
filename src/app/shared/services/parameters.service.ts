import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import {
  responseSettingsModel as respondeModel,
  WSparameter as paramModel,
  ParamsGeneralModel as paraGeneModel,
} from '../../shared/models/parameters';
import {
  wsWithOutLoader,
  paramsLogin,
  compensateAccounts,
  inspiraValidationAccounts as validAccounts,
} from '../../libraries/utilities.library';
import { paramsHttp } from '../../libraries/utilities.library';

@Injectable({
  providedIn: 'root'
})

export class ParametersService {
  headers = new HttpHeaders(paramsHttp.headerGeneral);
  processedParams = false;

  constructor(
    private http: HttpClient,
  ) { }

  allParameters(): Observable<respondeModel> {
    return this.http.get<respondeModel>(env.endpoints.Parameters.url + env.endpoints.Parameters.endpoints.readall,
      { headers: this.headers }
    );
  }

  allParametersGeneral(): Observable<any> {
    return this.http.get<any>(env.endpoints.ParametersGenerals.url + env.endpoints.ParametersGenerals.endpoints.readall,
      { headers: this.headers }
    );
  }

  createParameter(body: any): Observable<any> {
    return this.http.post<any>(env.endpoints.Parameters.url + env.endpoints.Parameters.endpoints.create,
      body,
      { headers: this.headers }
    );
  }

  updateParameter(body: any): Observable<any> {
    return this.http.put<any>(env.endpoints.Parameters.url + env.endpoints.Parameters.endpoints.update,
      body,
      { headers: this.headers }
    );
  }

  deleteParameter(id: string): Observable<any> {
    return this.http.delete<any>(env.endpoints.Parameters.url + env.endpoints.Parameters.endpoints.delete + `${id}`,
      { headers: this.headers }
    );
  }

  updateDataServers(list: paramModel[]): Promise<boolean> {
    var promise: Promise<boolean> = new Promise((resolve, reject) => {
      try {
        list.map(item => {
          switch (item.code) {
            // Settings
            case 'CP054':
              env.endpoints.Settings.endpoints.readall = item.endpoint;
              break;
            case 'CP053':
              env.endpoints.Settings.endpoints.create = item.endpoint;
              break;
            case 'CP051':
              env.endpoints.Settings.endpoints.update = item.endpoint;
              break;
            case 'CP052':
              env.endpoints.Settings.endpoints.delete = item.endpoint;
              break;
            // Symptom - Bus
            case 'CP102':
              env.endpoints.Symptom.endpoints.readall = item.endpoint;
              break;
            case 'CP099':
              env.endpoints.Symptom.endpoints.create = item.endpoint;
              break;
            case 'CP100':
              env.endpoints.Symptom.endpoints.update = item.endpoint;
              break;
            case 'CP101':
              env.endpoints.Symptom.endpoints.delete = item.endpoint;
              break;
            // Origin - Bus
            case 'CP113':
              env.endpoints.Origin.endpoints.readall = item.endpoint;
              break;
            case 'CP109':
              env.endpoints.Origin.endpoints.create = item.endpoint;
              break;
            case 'CP110':
              env.endpoints.Origin.endpoints.update = item.endpoint;
              break;
            case 'CP111':
              env.endpoints.Origin.endpoints.delete = item.endpoint;
              break;
            // Stratum
            case 'CP030':
              env.endpoints.Stratum.endpoints.readall = item.endpoint;
              break;
            case 'CP029':
              env.endpoints.Stratum.endpoints.create = item.endpoint;
              break;
            case 'CP026':
              env.endpoints.Stratum.endpoints.update = item.endpoint;
              break;
            case 'CP027':
              env.endpoints.Stratum.endpoints.delete = item.endpoint;
              break;
            // Cause - Bus
            case 'CP092':
              env.endpoints.Cause.endpoints.readall = item.endpoint;
              break;
            case 'CP093':
              env.endpoints.Cause.endpoints.readid = item.endpoint;
              break;
            case 'CP089':
              env.endpoints.Cause.endpoints.create = item.endpoint;
              break;
            case 'CP090':
              env.endpoints.Cause.endpoints.update = item.endpoint;
              break;
            case 'CP091':
              env.endpoints.Cause.endpoints.delete = item.endpoint;
              break;
            // System status - Bus
            case 'CP097':
              env.endpoints.SystemStatus.endpoints.readall = item.endpoint;
              break;
            case 'CP098':
              env.endpoints.SystemStatus.endpoints.readid = item.endpoint;
              break;
            case 'CP094':
              env.endpoints.SystemStatus.endpoints.create = item.endpoint;
              break;
            case 'CP095':
              env.endpoints.SystemStatus.endpoints.update = item.endpoint;
              break;
            case 'CP096':
              env.endpoints.SystemStatus.endpoints.delete = item.endpoint;
              break;
            // Priorities - Bus
            case 'CP108':
              env.endpoints.Priority.endpoints.readall = item.endpoint;
              break;
            case 'CP107':
              env.endpoints.Priority.endpoints.readid = item.endpoint;
              break;
            case 'CP104':
              env.endpoints.Priority.endpoints.create = item.endpoint;
              break;
            case 'CP105':
              env.endpoints.Priority.endpoints.update = item.endpoint;
              break;
            case 'CP106':
              env.endpoints.Priority.endpoints.delete = item.endpoint;
              break;
            // Bulk load
            case 'BT001':
              env.endpoints.BulkLoad.endpoints.create = item.endpoint;
              break;
            // Faults
            case 'RR002':
              env.endpoints.Faults.endpoints.readall = item.endpoint;
              wsWithOutLoader.push(item.endpoint);
              break;
            case 'RR004':
              env.endpoints.Faults.endpoints.readid = item.endpoint;
              break;
            case 'RR001':
              env.endpoints.Faults.endpoints.load = item.endpoint;
              break;
            // Maintenance Orders Causes - Bus
            case 'CP129':
              env.endpoints.OrderCause.endpoints.readall = item.endpoint;
              break;
            case 'CP130':
              env.endpoints.OrderCause.endpoints.create = item.endpoint;
              break;
            case 'CP128':
              env.endpoints.OrderCause.endpoints.update = item.endpoint;
              break;
            case 'CP131':
              env.endpoints.OrderCause.endpoints.delete = item.endpoint;
              break;
            // Maintenance Orders Symptoms - Bus
            case 'CP132':
              env.endpoints.OrderSymptoms.endpoints.readall = item.endpoint;
              break;
            case 'CP134':
              env.endpoints.OrderSymptoms.endpoints.create = item.endpoint;
              break;
            case 'CP133':
              env.endpoints.OrderSymptoms.endpoints.update = item.endpoint;
              break;
            case 'CP135':
              env.endpoints.OrderSymptoms.endpoints.delete = item.endpoint;
              break;
            // RR - parameterization - billing periods - Bus
            case 'CP125':
              env.endpoints.BillingPeriods.endpoints.readAll = item.endpoint;
              break;
            case 'CP122':
              env.endpoints.BillingPeriods.endpoints.create = item.endpoint;
              break;
            case 'CP123':
              env.endpoints.BillingPeriods.endpoints.update = item.endpoint;
              break;
            case 'CP124':
              env.endpoints.BillingPeriods.endpoints.delete = item.endpoint;
              break;
            // Validation Accounts
            case 'CP008':
              env.endpoints.ValidationAccounts.endpoints.readall = item.endpoint;
              break;
            case 'CP007':              
              env.endpoints.ValidationAccounts.endpoints.create = item.endpoint;
              break;
            case 'CP005':
              env.endpoints.ValidationAccounts.endpoints.update = item.endpoint;
              break;
            case 'CP006':
              env.endpoints.ValidationAccounts.endpoints.delete = item.endpoint;
              break;
            // Validation Nodes: 'MaximoService/readAll'
            case 'RR033':
              env.endpoints.ValidationIntTelNode48H.endpoints.readall = item.endpoint;
              break;
            case 'RR032':
              env.endpoints.ValidationIntTelNode48H.endpoints.create = item.endpoint;
              break;
            case 'RR030':
              env.endpoints.ValidationIntTelNode48H.endpoints.update = item.endpoint;
              break;
            case 'RR031':
              env.endpoints.ValidationIntTelNode48H.endpoints.delete = item.endpoint;
              break;
            // failure validation - TBL_NODO_TV_16H - By_nodo_acuer11_2006_TV16H
            case 'RR055':
              env.endpoints.ValidationTvNode16H.endpoints.readall = item.endpoint;
              break;
            case 'RR054':
              env.endpoints.ValidationTvNode16H.endpoints.create = item.endpoint;
              break;
            case 'RR052':
              env.endpoints.ValidationTvNode16H.endpoints.update = item.endpoint;
              break;
            case 'RR053':
              env.endpoints.ValidationTvNode16H.endpoints.delete = item.endpoint;
              break;
            // failure validation - TBL_ARREGLO_TV_16H - Compens_arreglo_TV16H
            case 'RR050':
              env.endpoints.ValidationTvSetting16H.endpoints.readall = item.endpoint;
              break;
            case 'RR049':
              env.endpoints.ValidationTvSetting16H.endpoints.create = item.endpoint;
              break;
            case 'RR047':
              env.endpoints.ValidationTvSetting16H.endpoints.update = item.endpoint;
              break;
            case 'RR048':
              env.endpoints.ValidationTvSetting16H.endpoints.delete = item.endpoint;
              break;
            // failure validation - TBL_ARREGLO_TEL_INT_48H - Compens_arreglos_telef_48H
            case 'RR029':
              env.endpoints.ValidationTelepSettlemCompensas.endpoints.readall = item.endpoint;
              break;
            case 'RR028':
              env.endpoints.ValidationTelepSettlemCompensas.endpoints.create = item.endpoint;
              break;
            case 'RR025':
              env.endpoints.ValidationTelepSettlemCompensas.endpoints.update = item.endpoint;
              break;
            case 'RR026':
              env.endpoints.ValidationTelepSettlemCompensas.endpoints.delete = item.endpoint;
              break;
            // failure validation - TBL_COMPES_TEL_INT_48H - Compes_telef_48H
            case 'RR019':
              env.endpoints.ValidationTelepCompensa.endpoints.readall = item.endpoint;
              break;
            case 'RR018':
              env.endpoints.ValidationTelepCompensa.endpoints.create = item.endpoint;
              break;
            case 'RR015':
              env.endpoints.ValidationTelepCompensa.endpoints.update = item.endpoint;
              break;
            case 'RR016':
              env.endpoints.ValidationTelepCompensa.endpoints.delete = item.endpoint;
              break;
            // failure validation - TBL_COMPES_TV_16H - Compes_TV_16H
            case 'RR045':
              env.endpoints.ValidationTelevCompensa.endpoints.readall = item.endpoint;
              break;
            case 'RR044':
              env.endpoints.ValidationTelevCompensa.endpoints.create = item.endpoint;
              break;
            case 'RR041':
              env.endpoints.ValidationTelevCompensa.endpoints.update = item.endpoint;
              break;
            case 'RR042':
              env.endpoints.ValidationTelevCompensa.endpoints.delete = item.endpoint;
              break;
            // RR - validation - node - Bus
            case 'CP117':
              env.endpoints.NodesValidation.endpoints.readAll = item.endpoint;
              break;
            case 'CP119':
              env.endpoints.NodesValidation.endpoints.readAllApproved = item.endpoint;
              break;
            case 'CP121':
              env.endpoints.NodesValidation.endpoints.readAllRejectedForQuality = item.endpoint;
              break;
            case 'CP115':
              env.endpoints.NodesValidation.endpoints.update = item.endpoint;
              break;
            // RR - validation - node (new causes)
            case 'CP056':
              env.endpoints.NewCauses.endpoints.run = item.endpoint;
              break;
            case 'CP057':
              env.endpoints.NewCauses.endpoints.readAll = item.endpoint;
              break;
            // RR - validation - node (new symptoms)
            case 'CP087':
              env.endpoints.NewSymptoms.endpoints.run = item.endpoint;
              break;
            case 'CP088':
              env.endpoints.NewSymptoms.endpoints.readAll = item.endpoint;
              break;
            // failure validation - TBL_COMPES_IMPROCEDENCIA - Improcedencia_falla_masiva
            case 'RR040':
              env.endpoints.ValidationMassImproperFailure.endpoints.readall = item.endpoint;
              break;
            case 'RR039':
              env.endpoints.ValidationMassImproperFailure.endpoints.create = item.endpoint;
              break;
            case 'RR036':
              env.endpoints.ValidationMassImproperFailure.endpoints.update = item.endpoint;
              break;
            case 'RR037':
              env.endpoints.ValidationMassImproperFailure.endpoints.delete = item.endpoint;
              break;
            // detalle compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
            case 'RR062':
              env.endpoints.CompensationDetail.endpoints.readall = item.endpoint;
              break;
            case 'RR061':
              env.endpoints.CompensationDetail.endpoints.create = item.endpoint;
              break;
            case 'RR059':
              env.endpoints.CompensationDetail.endpoints.update = item.endpoint;
              break;
            case 'RR060':
              env.endpoints.CompensationDetail.endpoints.delete = item.endpoint;
              break;
            // total compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
            case 'RR024':
              env.endpoints.TotalCompensation.endpoints.readall = item.endpoint;
              break;
            case 'RR023':
              env.endpoints.TotalCompensation.endpoints.create = item.endpoint;
              break;
            case 'RR020':
              env.endpoints.TotalCompensation.endpoints.update = item.endpoint;
              break;
            case 'RR021':
              env.endpoints.TotalCompensation.endpoints.delete = item.endpoint;
              break;
            // nota compensación (ITEM FACTURACIÓN RR / CUENTAS COMPENSADAS RR)
            case 'RR013':
              env.endpoints.CompensationNote.endpoints.readall = item.endpoint;
              break;
            case 'RR012':
              env.endpoints.CompensationNote.endpoints.create = item.endpoint;
              break;
            case 'RR009':
              env.endpoints.CompensationNote.endpoints.update = item.endpoint;
              break;
            case 'RR010':
              env.endpoints.CompensationNote.endpoints.delete = item.endpoint;
              break;
            // Nodes Rents RR
            case 'RR007':
              env.endpoints.NodeRent.endpoints.readall = item.endpoint;
              break;
            // Accounts Rents RR
            case 'RR057':
              env.endpoints.AccountRent.endpoints.readall = item.endpoint;
              break;
            // Users
            case 'AUTENTICA':
              env.endpoints.User.endpoints.login = item.endpoint;
              break;
            // Supervision Process
            case 'CP020':
              env.endpoints.SupervisionProcess.endpoints.nodesRules = item.endpoint;
              break;
            case 'RR014':
              env.endpoints.SupervisionProcess.endpoints.businessRule = item.endpoint;
              break;
            case 'RR046':
              env.endpoints.SupervisionProcess.endpoints.billingFiles = item.endpoint;
              break;
            case 'RR035':
              env.endpoints.SupervisionProcess.endpoints.consolidateNodes = item.endpoint;
              break;
            // Notifications Mails
            case 'EMAIL_REST':
              env.endpoints.NotificationsEmail.endpoints.sendMail = item.endpoint;
              break;
            // Billing - Supervision Process - Bus
            case 'CP127':
              env.endpoints.BillingSupervision.endpoints.compensationValue = item.endpoint;
              break;
            case 'CP044':
              env.endpoints.BillingSupervision.endpoints.readAll = item.endpoint;
              wsWithOutLoader.push(item.endpoint);
              break;
            case 'CP041':
              env.endpoints.BillingSupervision.endpoints.update = item.endpoint;
              break;
            // Observacion Nodos
            case 'CP012':
              env.endpoints.Observation.endpoints.readall = item.endpoint;
              break;
            case 'CP011':
              env.endpoints.Observation.endpoints.create = item.endpoint;
              break;
            case 'CP009':
              env.endpoints.Observation.endpoints.update = item.endpoint;
              break;
            case 'CP010':
              env.endpoints.Observation.endpoints.delete = item.endpoint;
              break;
            // Parametros generales
            case 'CP062':
              env.endpoints.ParametersGenerals.endpoints.readall = item.endpoint;
              break;
            // Parametros Servicios
            // only service set
            default:
              break;
          }
        });
        this.processedParams = true;
        resolve(true);
      } catch (error) {
        resolve(true);
      }
    });
    return promise;
  }

  consumeInitialServices(): Promise<boolean> {
    var promise: Promise<boolean> = new Promise((resolve, reject) => {
      try {
        if (!this.processedParams) {
          this.allParameters().subscribe(resp => {
            if (resp.GeneralResponse.code == '0') {
              this.updateDataServers(resp.WebServiceParameters.WebServiceParameter).then(() => {
                this.consumeParamsGenerals().then( resp => resolve(true) );
              });
            } else {
              this.consumeParamsGenerals().then( resp => resolve(true) );
            }
          }, () => {
            this.consumeParamsGenerals().then( resp => resolve(true) );
          });
        } else {
          resolve(true);
        }
      } catch (err) {
        reject(true)
      }
    });
    return promise;
  }


  consumeParamsGenerals(): Promise<boolean> {
    var promise: Promise<boolean> = new Promise((resolve, reject) => {
      this.allParametersGeneral().subscribe(resp => {
        if (resp.GeneralResponse.code == '0') {
          this.updateParamsGeneral(resp.parameter);
        }
        resolve(true);
      }, () => resolve(true) )
    });
    return promise;
  }
  updateParamsGeneral(list: paraGeneModel[]) {
    list.map(item => {
      switch (item.code) {
        // ID App
        case 'idApp':
          paramsLogin.idApp = item.value;
          break;
        // Max Cuentas Compensadas
        case 'maxCompensateAccounts':
          compensateAccounts.totalMaxValue = parseInt(item.value);
          break;
        // Accounts High Amount
        case 'highAmount':
          validAccounts.highAmmount = parseInt(item.value);
          break;
        default:
          break;
      }
    });
  }
}
