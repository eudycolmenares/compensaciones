import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ValidationAccountsService } from '../../../services/validationAccounts/validation-accounts.service';
import { ToastService } from '../../../shared/services/toast.service';
import { inspiraValidationAccounts as validAccounts } from '../../../libraries/utilities.library';
import { 
  responseAccountsModel,
  requestAccountsModel,
  accountModel
} from '../../../models/accoaunts';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent implements OnInit {
  form: FormGroup;
  actionForm = 'create'; // create, update
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
    private fb: FormBuilder,
    private gnrScv: GeneralFunctionsService,
    private accountsSvc: ValidationAccountsService,
    private toastScv: ToastService,
  ) {
    this.createForm();
    this.initializeVariables();
  }

  ngOnInit(): void {
  }

  initializeVariables() {
    this.initialCharge(); // table
  }

  initialCharge() {
    this.accountsSvc.allValidationAccounts().subscribe((resp: responseAccountsModel) => {
      this.dataToTable = resp.list;
    });
  }
  createForm() {
    this.form = this.fb.group({
      id: [''],
      amount: ['', [Validators.required]],
      changeService: ['', [Validators.required]],
      contractCode: ['', Validators.required],
      contractId: ['', Validators.required],
      customerId: ['', Validators.required],
      customerNumber: ['', Validators.required],
      validFrom: ['', Validators.required],
    })
  }

  get invalidAmount() {
    return this.form.get('amount').touched && this.form.get('amount').invalid;
  }
  get invalidChangeService() {
    return this.form.get('changeService').touched && this.form.get('changeService').invalid;
  }
  get invalidContractCode() {
    return this.form.get('contractCode').touched && this.form.get('contractCode').invalid;
  }
  get invalidContractId() {
    return this.form.get('contractId').touched && this.form.get('contractId').invalid;
  }
  get invalidCustomerId() {
    return this.form.get('customerId').touched && this.form.get('customerId').invalid;
  }
  get invalidCustomerNumber() {
    return this.form.get('customerNumber').touched && this.form.get('customerNumber').invalid;
  }
  get invalidValidFrom() {
    return this.form.get('validFrom').touched && this.form.get('validFrom').invalid;
  }
  textsFormInvalid(field: string) {
    return this.gnrScv.validationFormTextRequired(this.form, field);
  }

  onSubmit() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else {
      const dataRequest: requestAccountsModel = {
        'compCrc': {
          'amount': this.form.get('amount').value,
          'changeService': this.form.get('changeService').value,
          'contractCode': this.form.get('contractCode').value,
          'contractId': this.form.get('contractId').value,
          'customerId': this.form.get('customerId').value,
          'customerNumber': this.form.get('customerNumber').value,
          'validFrom': this.gnrScv.formatDate('YYYY-MM-DD HH:mm:ss', this.form.get('validFrom').value),
          'highAmount': (this.form.get('amount').value >= validAccounts.highAmmount) ? '1' : '0',
        }
      }
      if(this.actionForm === 'create') {
        this.createAccountApi(dataRequest);
      }else { // update
        dataRequest.compCrc.id = this.form.get('id').value;
        this.updateAccountApi(dataRequest);
      }
    }
  }
  createAccountApi(dataRequest: requestAccountsModel) {
    this.accountsSvc.createAccount(dataRequest).subscribe(resp => {
      if (resp.response.code === '0') {
        this.toastScv.showSuccess(resp.response.messageCode, resp.response.descriptionCode);
        this.initialCharge();
      } else { this.toastScv.showError(resp.response.messageCode, resp.response.descriptionCode); }
    })
  }
  updateAccountApi(dataRequest: requestAccountsModel) {
    this.accountsSvc.updateAccount(dataRequest).subscribe(resp => {
      if (resp.response.code === '0') {
        this.toastScv.showSuccess(resp.response.messageCode, resp.response.descriptionCode);
        this.initialCharge();
      } else { this.toastScv.showError(resp.response.messageCode, resp.response.descriptionCode); }
    })
  }

  updateAccount(account: accountModel) {
    this.setForm(account);
    this.actionForm = 'update';
  }
  setForm(data: accountModel) {
    this.form.reset({
      id: data.id,
      amount: data.amount,
      changeService: data.changeService,
      contractCode: data.contractCode,
      contractId: data.contractId,
      customerId: data.customerId,
      customerNumber: data.customerNumber,
      validFrom: new Date (Date.parse(data.validFrom))
    });
  }

  deleteAccount(account: accountModel) {
    this.accountsSvc.deleteAccount(account.id).subscribe(resp => {
      if (resp.response.code === '0') {
        this.toastScv.showSuccess(resp.response.messageCode, resp.response.descriptionCode);
        this.initialCharge();
      } else { this.toastScv.showError(resp.response.messageCode, resp.response.descriptionCode); }
    })
  }

  downloadDataTable() {
    if (this.dataToTable.length > 0) {
      const columNames = {
        english:<string[]> this.structure.reduce( (prev: [], curr) => [...prev, curr['name']], []),
        spanish:<string[]> this.structure.reduce( (prev: [], curr) => [...prev, curr['description']], []),
      };
      const nameFile = 'ValidationAccounts' + '_' + this.gnrScv.toISOLocal(new Date());
      this.gnrScv.exportToCsv(this.dataToTable, columNames, nameFile);
    }
  }

  cleanForm() {
    this.form.reset();
    this.actionForm = 'create';
  }
}
