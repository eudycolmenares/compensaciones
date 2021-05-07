import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NodesRentsRRService } from '../../../services/nodesRentsRR/nodes-rents-rr.service';
import { AccountsRentsRRService } from '../../../services/accountsRentsRR/accounts-rents-rr.service';
import { ToastService } from '../../../shared/services/toast.service';
import {
  responseNodesModel as responseModel,
  nodeRentModel as nodeModel,
  requestNodeRentModel as requestModel
} from '../../../models/nodes-rents-rr';
import {
  responseAccountsModel,
  requestAccountRentModel as requestAccountModel,
  accountRentModel as accountModel,
} from '../../../models/accounts-rents-rr';
import { GeneralFunctionsService } from '../../../services/general-functions.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})

export class DownloadComponent implements OnInit {
  // table
  dataToTableNodes: nodeModel[];
  dataToTableAccounts: accountModel[];
  structureNodes: object[] = [
    {
      name: 'node',
      description: 'NODOS',
      validation: '',
    }
  ];
  structureAccounts: object[] = [
    {
      name: 'account',
      description: 'CUENTAS',
      validation: '',
    }
  ];
  formNode: FormGroup;
  formAccount: FormGroup;
  actionFormNode = 'create'; // create, update
  actionFormAccount = 'create'; // create, update

  constructor(
    private nodesSvc: NodesRentsRRService,
    private accountSvc: AccountsRentsRRService,
    private fb: FormBuilder,
    private gnrScv: GeneralFunctionsService,
    private toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
  }

  initializeVariables() {
    this.initialCharge(); // table
  }
  initialCharge(caseUse = '') {
    this.cleanForm();
    if(caseUse === 'node' || caseUse === '') {
      this.nodesSvc.allNodesRents().subscribe((resp: responseModel) => {
        this.dataToTableNodes = resp.NodesRents.NodeRent.map(node => (
          {
            id: node,
            node: node
          }
        ));
      });
    }
    if(caseUse === 'account' || caseUse === '') {
      this.accountSvc.allAccounts().subscribe((resp: responseAccountsModel) => {
        // this.dataToTableAccounts = resp.AccountsRents.AccountRent;
        this.dataToTableAccounts = resp.AccountsRents.AccountRent.map(account => (
          {
            id: account,
            account:  (Math.trunc(parseInt(account))).toString()
          }
        ));
      });
    }
  }

  createForm() {
    this.formNode = this.fb.group({
      id: [''],
      node: ['', [Validators.required, Validators.maxLength(100)]],
      date: [''],
    });
    this.formAccount = this.fb.group({
      id: [''],
      account: ['', [Validators.required, Validators.maxLength(100)]],
      date: [''],
    });
  }
  get invalidNode() {
    return this.formNode.get('node').touched && this.formNode.get('node').invalid;
  }
  get invalidAccount() {
    return this.formAccount.get('account').touched && this.formAccount.get('account').invalid;
  }
  textsFormInvalid(field: string) {
    if(field === 'node'){
      return this.gnrScv.validationFormTextRequired(this.formNode, field);
    }else{
      return this.gnrScv.validationFormTextRequired(this.formAccount, field);
    }
  }

  generateFile(caseUse: string) {
    let content = '';
    let namefile = '';
    switch (caseUse) {
      case 'nodes':
        for (const item of this.dataToTableNodes) {
          (content === '') ? content = item['node'] : content = `${content}\n${item['node']}`;
        }
        namefile = 'nodes-rent-rr.txt'
        break;
      case 'accounts':
        for (const item of this.dataToTableAccounts) {
          (content === '') ? content = item['account'] : content = `${content}\n${item['account']}`;
        }
        namefile = 'accounts-rent-rr.txt'
        break;
    }
    this.exportToFile(content , namefile)
  }

  exportToFile(csvContent: string, nameFile: string): void {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display:none');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = nameFile;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  cleanForm(caseUse = '') {
    if(caseUse === 'node' || caseUse === '') {
      this.formNode.reset();
      this.actionFormNode = 'create';
    }
    if(caseUse === 'account' || caseUse === ''){
      this.formAccount.reset();
      this.actionFormAccount = 'create';
    }
  }
}
