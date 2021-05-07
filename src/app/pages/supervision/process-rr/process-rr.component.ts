import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

import { ProcessesService } from '../../../services/processes/processes.service';
import { SupervisionProcessService } from '../../../services/supervision/supervision-process.service';
import { ToastService } from '../../../shared/services/toast.service';
import { MailsService } from '../../../shared/services/mails.service';
import { FaultsService } from '../../../services/faults/faults.service';
import { ParametersService } from '../../../shared/services/parameters.service';

import {
  bodyMailService,
  superProcessParams,
  loadFaultsParams,
  arrayTypesRents,
  timeRefreshMinutes as timeExp,
} from '../../../libraries/utilities.library';
import {
  responseProcessModel,
  processModel,
  reqUpdateProcessModel as reqUpdateModel,
  respUpdateProcessModel as respUpdateModel,
  sendMailModel
} from '../../../models/supervisionProcess';
import {
  faultsApiModel,
  loadModel
} from '../../../models/faults';

@Component({
  selector: 'app-process-rr',
  templateUrl: './process-rr.component.html',
  styleUrls: ['./process-rr.component.scss']
})

export class ProcessRRComponent implements OnInit {
  stages: processModel[]
  randomKey: string;
  processParams = superProcessParams;
  uploadedFaults: loadModel[] = null;
  itemsSteps: MenuItem[];
  activeStep: number = null;
  timeOutSesion = null;

  constructor(
    private processesSvc: ProcessesService,
    private supervisionSvc: SupervisionProcessService,
    private toastScv: ToastService,
    private confirmationSvc: ConfirmationService,
    private mailSvc: MailsService,
    private faultsScv: FaultsService,
    private paramsSvc: ParametersService
  ) {
    this.randomKey = Math.ceil(Math.random() * 10000).toString();
    // check server services
    if (!this.paramsSvc.processedParams) {
      this.paramsSvc.allParameters().subscribe(resp => {
        if (resp.GeneralResponse.code == '0') {
          this.paramsSvc.updateDataServers(resp.WebServiceParameters.WebServiceParameter).then(() => {
            this.getProcesses();
          }).catch(() => this.getProcesses() );
        }
      }, () => this.getProcesses() );
    } else { this.getProcesses() }
  }
  stageSelected = 1;

  ngOnInit(): void { }

  setItemsSteps(first: boolean, stg = null) {
    let stage: processModel = null;
    (first) ? stage = this.stages[this.stageSelected - 1] : stage = stg;
    switch (stage.stateProcess) {
      case 'INICIADO':
        this.activeStep = 0;
        break;
      case 'EN PROGRESO':
        this.activeStep = 1;
        break;
      case 'COMPLETADO':
        this.activeStep = 2;
        break;
      default:
        this.activeStep = null;
        break;
    }
    this.itemsSteps = [
      {
        label: 'Iniciado',
        styleClass: ['INICIADO', 'EN PROGRESO', 'COMPLETADO'].includes(stage.stateProcess) ? 'step-item-success' : '',
      },
      {
        label: 'En Proceso',
        styleClass: ['EN PROGRESO', 'COMPLETADO'].includes(stage.stateProcess) ? 'step-item-success' : '',
      },
      {
        label: 'Finalizado',
        styleClass: ['COMPLETADO'].includes(stage.stateProcess) ? 'step-item-success' : '',
      },
    ];
  }

  changeStage(stage) {
    this.stageSelected = stage.stage;
    // Inicializo Stepper segun proceso seleccionado
    this.setItemsSteps(false, stage);
  }

  runRuleNodes() {
    const body = this.bodyEmailFromServices();
    this.processesSvc.runNodesRules(body).subscribe(resp => {
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.getProcesses();
      } else {
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    })
  }
  runRuleBusiness() {
    const body = this.bodyEmailFromServices();
    this.processesSvc.runBusinessRules(body).subscribe(resp => {
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.getProcesses();
      } else {
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    })
  }
  runConsolidateAccNod() {
    const body = this.bodyEmailFromServices();
    this.processesSvc.ConsolidationAccountsNodes(body).subscribe(resp => {
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.getProcesses();
      } else {
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    })
  }
  confirmBillingFiles() {
    const body = this.bodyEmailFromServices();
    this.processesSvc.confirmBillingFiles(body).subscribe(resp => {
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.getProcesses();
      } else {
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    })
  }
  changeStatusStageServer(changePostEmail = false) {
    const body: reqUpdateModel = {
      'TblSupervisionProcess': {
        ...this.stages[this.stageSelected - 1],
        stateProcess: 'COMPLETADO'
      }
    };
    (changePostEmail) ? body.TblSupervisionProcess.stateSendEmail = '1' : '' ;
    this.supervisionSvc.updateProcess(body).subscribe((resp: respUpdateModel) => {
      if (resp.generalResponse.code != '-1') {
        if (!changePostEmail) {
          this.toastScv.showSuccess(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
          this.sendEmailNotification();
          // consult updated processes in sendEmailNotification()
        } else {
          this.getProcesses();
        }
      } else {
        this.toastScv.showError(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
      }
    })
  }

  getAllFaults() {
    this.faultsScv.readAllFaults().subscribe((resp: faultsApiModel) => {
      if (resp.GeneralResponse.code === '0') {
        const arrayTypesFaults = loadFaultsParams.optionsList.reduce((pre, current) => [...pre, current.valueOption], []);
        (this.stageSelected == 3)
          ? this.uploadedFaults = resp.Loads.Load.filter(item => arrayTypesFaults.includes(item.loadType))
          : this.uploadedFaults = resp.Loads.Load.filter(item => arrayTypesRents.includes(item.loadType))
          ;
        if (
          this.uploadedFaults.length > 0 &&
          this.uploadedFaults.filter(item => item.state == 'FINALIZADO').length > 0) {
          (this.stageSelected == 3)
            ? this.runRuleBusiness()
            : this.changeStatusStageServer()
            ;
        } else {
          this.toastScv.showError(superProcessParams.errorLoadedProcesses, 'Información');
        }
      } else {
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    });
  }
  getProcesses() {
    this.supervisionSvc.allProcess().subscribe((resp: responseProcessModel) => {
      this.stages = [...resp.tblProcesoSupervision];
      this.compareToSort(this.stages);
      let incomplete = false;
      this.stages.map(item => {
        item.stateProcess === 'NO COMPLETADO' || item.stateProcess === 'ERROR' ? item.status = 0 : item.status = 1;
        item.stage = parseInt(item.processCode);
        ['INICIADO', 'EN PROGRESO'].includes(item.stateProcess) && (incomplete = true);
      });
      (incomplete) && this.startMyTimeOut(); // refresh consult
      this.setItemsSteps(true); // inicializo steps
    });
  }

  // modal - confirmation
  openModal() {
    const header = superProcessParams['confirByStages'][this.stageSelected]['header'];
    const msg = superProcessParams['confirByStages'][this.stageSelected]['msg'];
    this.confirmationSvc.confirm({
      header: header,
      message: msg,
      icon: 'pi pi-info-circle',
      accept: () => {
        switch (this.stageSelected) {
          case 1:
            this.runRuleNodes();
            break;
          case 2:
            this.changeStatusStageServer();
            break;
          case 3:
            this.getAllFaults();
            break;
          case 4:
            this.changeStatusStageServer();
            break;
          case 5:
            this.runConsolidateAccNod();
            break;
          case 6:
            this.getAllFaults();
            break;
          case 7:
            this.confirmBillingFiles();
            break;
        }
      },
      reject: () => { },
      key: this.randomKey
    });
  }

  // Notificacion - email
  sendEmailNotification() {
    if (this.stages[this.stageSelected - 1].sendEmail == '1' && this.stages[this.stageSelected - 1].email) {
      const arrayExps = superProcessParams['email']['exps'];
      let msg = bodyMailService['message'];
      arrayExps.map(exp => { // evaluar si hay cambios
        (exp['exp'] == '$$MAIL$$')
          ? msg = msg.replace(exp['exp'], this.stages[this.stageSelected - 1].email)
          : msg = msg.replace(exp['exp'], exp['content'])
          ;
      });
      const newBodySvc = { ...bodyMailService, 'message': msg };
      this.mailSvc.sendMail(newBodySvc).subscribe(resp => {
        if (resp?.isValid == 'true') {
          this.toastScv.showSuccess('Se ha enviado la notificación satisfactoriamente.'); // acomodar
          this.changeStatusStageServer(true);
        }
      }, () => {
        this.getProcesses();
      });
    } else if (this.stages[this.stageSelected - 1].sendEmail === '1' && !this.stages[this.stageSelected - 1].email) {
      this.toastScv.showError(superProcessParams.emptyEmail);
    }
  }

  compareToSort(items: processModel[]) {
    return items.sort((a, b) => parseInt(a.processCode) - parseInt(b.processCode));;
  }

  startMyTimeOut() {
    this.timeOutSesion = setTimeout(() => {
      this.getProcesses();
    }, (timeExp * 60000))
  }

  bodyEmailFromServices(): sendMailModel {
    return {
      "SendEmail": {
        "email": this.stages[this.stageSelected - 1].email,
        "state": this.stages[this.stageSelected - 1].sendEmail
      }
    }
  }
}
