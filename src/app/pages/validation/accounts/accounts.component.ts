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
      name: 'amount',
      description: 'MONTO',
      validation: 'amount',
    },
    {
      name: 'changeService',
      description: 'CHANGE_SERVICE',
      validation: '',
    },
    {
      name: 'contractCode',
      description: 'CO_CODE',
      validation: ''
    },
    {
      name: 'contractId',
      description: 'CO_ID',
      validation: ''
    },
    {
      name: 'customerId',
      description: 'CUSTOMER_ID',
      validation: '',
    },
    {
      name: 'customerNumber',
      description: 'CUSTNUM',
      validation: ''
    },
    {
      name: 'validFrom',
      description: 'VALID_FROM',
      validation: 'date'
    },
    {
      name: 'highAmount',
      description: 'HIGH_AMOUNT',
      validation: 'highAmount'
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
      this.dataToTable = resp.list;
    });
  }
}
