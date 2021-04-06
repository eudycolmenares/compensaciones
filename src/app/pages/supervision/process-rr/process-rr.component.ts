import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { ProcessesService } from '../../../services/processes/processes.service';
import { SupervisionProcessService } from '../../../services/supervision/supervision-process.service';
import { ToastService } from '../../../shared/services/toast.service';
import { MailsService } from '../../../shared/services/mails.service';

import {
  bodyMailService,
  superProcessParams
} from '../../../libraries/utilities.library';
import {
  responseProcessModel,
  processModel,
  reqUpdateProcessModel as reqUpdateModel,
  respUpdateProcessModel as respUpdateModel
} from '../../../models/supervisionProcess';

@Component({
  selector: 'app-process-rr',
  templateUrl: './process-rr.component.html',
  styleUrls: ['./process-rr.component.scss']
})

export class ProcessRRComponent implements OnInit {
  stages: processModel[]
  randomKey: string;
  processParams = superProcessParams;

  constructor(
    private processesSvc: ProcessesService,
    private supervisionSvc: SupervisionProcessService,
    private toastScv: ToastService,
    private confirmationSvc: ConfirmationService,
    private mailSvc: MailsService
    ) {
      this.randomKey = Math.ceil(Math.random() * 10000).toString();
      this.getProcesses();
    }
  stageSelected = 1;

  ngOnInit(): void {}

  changeStage(stage) {
    console.log('changeState()', stage);
    this.stageSelected = stage.stage;
  }

  runRuleNodes() { // process 1
    this.processesSvc.runNodesRules().subscribe(resp => {
      console.log('runNodesRules()', resp);
      if (resp.generalResponse.code === '0') {
        this.toastScv.showSuccess(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
        this.sendEmailNotification();
        this.changeStatusStage(true);
      } else {
        this.toastScv.showError(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
      }
    })
  }
  runRuleBusiness() {
    this.processesSvc.runBusinessRules().subscribe(resp => {
      console.log('runBusinessRules()', resp);
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.sendEmailNotification();
        this.changeStatusStage(true);
        this.changePostStatusStage(true);
      } else {
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    })
  }
  confirmBillingFiles() {
    this.processesSvc.confirmBillingFiles().subscribe(resp => {
      console.log('confirmBillingFiles()', resp);
      if (resp.GeneralResponse.code === '0') {
        this.toastScv.showSuccess(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
        this.sendEmailNotification();
        this.changeStatusStage(true);
        this.changePostStatusStage(true);
      } else {
        this.toastScv.showError(resp.GeneralResponse.messageCode, resp.GeneralResponse.descriptionCode);
      }
    })
  }
  changeStatusStageServer() {
    console.log('changeStatusStageServer()...');
    console.log('this.stageSelected: ', this.stageSelected);
    console.log(this.stages[this.stageSelected -1]);
    const body: reqUpdateModel = {
      'TblSupervisionProcess': {
        ...this.stages[this.stageSelected -1],
        stateProcess: 'COMPLETADO'
      }
    }
    delete body.TblSupervisionProcess.stage
    delete body.TblSupervisionProcess.status
    this.supervisionSvc.updateProcess(body).subscribe((resp: respUpdateModel) => {
      console.log('updateProcess()', resp);
      if (resp.generalResponse.code != '-1') {
        this.changeStatusStage(true);
        this.sendEmailNotification();
      } else {
        this.toastScv.showError(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
      }
    })


  }

  changeStatusStage(success: boolean) {
    (success) ? this.stages[this.stageSelected -1].status = 1 : '';
  }
  changePostStatusStage(success: boolean) {
    (success) ? this.stages[this.stageSelected].status = 1 : '';
  }

  getProcesses() {
    this.supervisionSvc.allProcess().subscribe((resp: responseProcessModel) => {
      this.stages = [...resp.tblProcesoSupervision];
      this.compareToSort(this.stages);
      this.stages.map(item => {
        item.stateProcess === 'NO COMPLETADO' ? item.status = 0: item.status = 1;
        item.stage = parseInt(item.processCode);
      });
      console.log('stages ===> ', this.stages);
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
            this.runRuleBusiness();
            break;
          case 5:
            this.confirmBillingFiles();
            break;
        }
      },
      reject: () => {
        console.log('Rechazaste!!!');
      },
      key: this.randomKey
    });
  }

  // Notificacion - email
  sendEmailNotification() {
    if (this.stages[this.stageSelected -1].sendEmail === 1 && this.stages[this.stageSelected -1].email) {
      const arrayExps = superProcessParams['email']['exps'];
      let msg = bodyMailService['message'];
      arrayExps.map(exp => { // evaluar si hay cambios
        (exp['exp'] == '$$MAIL$$')
          ? msg = msg.replace(exp['exp'], this.stages[this.stageSelected -1].email)
          : msg = msg.replace(exp['exp'], exp['content'])
        ;
      });
      const newBodySvc = { ...bodyMailService, 'message': msg };
      this.mailSvc.sendMail(newBodySvc).subscribe(resp => {
        console.log('sendMail(resp): ', resp);
        if (resp?.isValid == 'true') {
          this.toastScv.showSuccess('Se ha enviado la notificación satisfactoriamente.');
        }
      });
    } else if (this.stages[this.stageSelected -1].sendEmail === 1 && !this.stages[this.stageSelected -1].email) {
      this.toastScv.showError(superProcessParams.emptyEmail);
    }
  }

  compareToSort(items: processModel[]) {
    return items.sort((a, b) => parseInt(a.processCode) - parseInt(b.processCode));;
  }
}
