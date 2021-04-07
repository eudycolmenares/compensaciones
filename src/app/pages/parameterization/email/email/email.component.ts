import { Component, OnInit } from '@angular/core';

import { SupervisionProcessService } from '../../../../services/supervision/supervision-process.service';
import { ToastService } from '../../../../shared/services/toast.service';
import {
  responseProcessModel,
  processModel,
  reqUpdateProcessModel as reqUpdateModel,
  respUpdateProcessModel as respUpdateModel
} from '../../../../models/supervisionProcess';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})

export class EmailComponent implements OnInit {
  processes: processModel[];

  constructor(
    private processSvc: SupervisionProcessService,
    private toastScv: ToastService,
  ) {
    this.initialConsultation();
  }

  ngOnInit(): void {
  }

  initialConsultation() {
    this.processSvc.allProcess().subscribe((resp: responseProcessModel) => {
      this.processes = [...resp.tblProcesoSupervision];
      this.compareToSort(this.processes);
    })
  }

  updateProcess(item: processModel) {
    if (this.validateEmail(item.email)) {
      const body: reqUpdateModel = {
        'TblSupervisionProcess': { ...item }
      }
      this.processSvc.updateProcess(body).subscribe((resp: respUpdateModel) => {
        if (resp.generalResponse.code != '-1') {
          this.toastScv.showSuccess(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
        } else {
          this.toastScv.showError(resp.generalResponse.messageCode, resp.generalResponse.descriptionCode);
        }
      })
    } else {
      this.toastScv.showError('Debe ingresar un email válido para el proceso que desea actualizar.', '¡Email inválido!');
    }
  }

  compareToSort(items: processModel[]) {
    return items.sort((a, b) => parseInt(a.processCode) - parseInt(b.processCode));;
  }
  validateEmail (email) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test (email);
  }
}
