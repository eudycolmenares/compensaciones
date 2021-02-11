import { Component, OnInit } from '@angular/core';

import { ValidationAccountsService } from '../../../services/validationAccounts/validation-accounts.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent implements OnInit {
  // table
  dataToTable: object[];
  structure: object[] = [
    {
      name: 'code',
      description: 'MONTO',
      validation: '',
    },
    {
      name: 'description',
      description: 'CHARGE_SERVICE',
      validation: '',
    },
    {
      name: 'state',
      description: 'CUSTNUM',
      validation: 'active-desactive'
    },
    {
      name: 'compensate',
      description: 'CUSTOMER_ID',
      validation: 'yes-no',
    },
    {
      name: 'maintenance',
      description: 'CO_CODE',
      validation: 'yes-no'
    },
    {
      name: 'telephone',
      description: 'CO_ID',
      validation: 'service'
    },
    {
      name: 'television',
      description: 'VALID_FROM',
      validation: 'service'
    },
    {
      name: 'internet',
      description: 'AMOUNT',
      validation: 'service'
    },
    {
      name: 'internet',
      description: 'REMARK',
      validation: 'service'
    },
  ];

  constructor(
    private accountsSvc: ValidationAccountsService
  ) {
    this.initializeVariables();
  }

  ngOnInit(): void {
  }

  initializeVariables() {
    this.initialCharge(); // table
  }

  initialCharge() {
    this.accountsSvc.allValidationAccounts().subscribe((resp: any) => {
      console.log('Consulta Accounts Validations: ', resp);
      // this.dataToTable = resp.symptom;
    });
  }
}
