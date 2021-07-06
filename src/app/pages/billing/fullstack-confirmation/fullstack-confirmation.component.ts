import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelectStatus } from '@libraries/utilities.library';
import {
  FullstackConfirmationModel,
  FullstackConfirmationsApiModel,
  RequestModel,
  ResponseModel,
} from '@models/fullstack-confirmation';
import { DataList } from '@models/general';

import { FullstackConfirmationService } from '@services/fullstackConfirmation/fullstack-confirmation.service';
import { GeneralFunctionsService } from '@services/general-functions.service';
import { ToastService } from '@shared_services/toast.service';
import { StructTableModel } from 'src/app/shared/models/parameters';

@Component({
  selector: 'app-fullstack-confirmation',
  templateUrl: './fullstack-confirmation.component.html',
  styleUrls: ['./fullstack-confirmation.component.scss'],
})
export class FullstackConfirmationComponent implements OnInit {
  fullstackConfirmationForm: FormGroup;
  selectState: DataList[] = [];

  actionForm: string = 'create'; // create, update
  // table
  dataToTable: FullstackConfirmationModel[];
  structureTable: StructTableModel[] = [
    {
      name: 'charge_service',
      description: 'Código Identificador único',
      validation: '',
    },
    {
      name: 'cust_num',
      description: 'Código cliente externo',
      validation: '',
    },
    {
      name: 'customer_id',
      description: 'Código cliente interno',
      validation: '',
    },
    {
      name: 'co_code',
      description: 'Código contrato externo',
      validation: '',
    },
    {
      name: 'co_id',
      description: 'Código contrato interno',
      validation: '',
    },
    {
      name: 'valid_from',
      description: 'Fecha de la OCC',
      validation: '',
    },
    {
      name: 'amount',
      description: 'Monto de la OCC',
      validation: '',
    },
    {
      name: 'execute_date',
      description: 'Fecha de BSCS',
      validation: '',
    },
    {
      name: 'state',
      description: 'Estado',
      validation: 'active-desactive',
    },
    {
      name: 'observation',
      description: 'Observación',
      validation: '',
    },
  ];
  constructor(
    private _fb: FormBuilder,
    private _fConfirmationSvc: FullstackConfirmationService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.fullstackConfirmationForm = this._fb.group({
      idCause: [''],
      charge_service: ['', [Validators.required]],
      cust_num: [''],
      customer_id: ['', [Validators.required]],
      co_code: [''],
      co_id: [''],
      valid_from: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      execute_date: ['', [Validators.required]],
      state: ['', [Validators.required]],
      observation: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  invalidFieldForm(fieldName: string) {
    return (
      this.fullstackConfirmationForm.get(fieldName).touched &&
      this.fullstackConfirmationForm.get(fieldName).invalid
    );
  }

  textFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(
      this.fullstackConfirmationForm,
      field
    );
  }

  initializeVariables() {
    for (const i of Object.entries(SelectStatus)) {
      this.selectState.push({ key: i[1], value: i[0] });
    }
    this.initialCharge(); // table
  }

  initialCharge() {
    // this._fConfirmationSvc
    //   .allFullstackConfirmations()
    //   .subscribe((resp: FullstackConfirmationsApiModel) => {
    //     if (resp.GeneralResponse.code == '0') {
    //       this.dataToTable = resp.FullstackConfirmations.FullstackConfirmation;
    //     } else {
    //       this._toastScv.showError(resp.GeneralResponse.messageCode);
    //     }
    //   });

      this.dataToTable = [
        {charge_service: 'test1' ,
        cust_num: 'test2' ,
        customer_id: 'test3' ,
        co_code: 'test4' ,
        co_id: 'test5' ,
        valid_from: '26/06/2021' ,
        amount: '5000' ,
        execute_date: '26/06/2021' ,
        state: '1' ,
        observation: 'test front' },
      ]
  }

  onSubmit() {
    console.log(this.fullstackConfirmationForm.value);

    if (this.fullstackConfirmationForm.invalid) {
      return Object.values(this.fullstackConfirmationForm.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
    } else {
      const dataRequest: RequestModel = {
        FullstackConfirmation: {
          charge_service:
            this.fullstackConfirmationForm.get('charge_service').value,
          cust_num: this.fullstackConfirmationForm.get('cust_num').value,
          customer_id: this.fullstackConfirmationForm.get('customer_id').value,
          co_code: this.fullstackConfirmationForm.get('co_code').value,
          co_id: this.fullstackConfirmationForm.get('co_id').value,
          valid_from: this.fullstackConfirmationForm.get('valid_from').value,
          amount: this.fullstackConfirmationForm.get('amount').value,
          execute_date:
            this.fullstackConfirmationForm.get('execute_date').value,
          state: this.fullstackConfirmationForm.get('state').value,
          observation: this.fullstackConfirmationForm.get('observation').value,
        },
      };
      if (this.actionForm === 'create') {
        this.createFullstackConfirmationApi(dataRequest);
      } else {
        dataRequest.FullstackConfirmation.id =
          this.fullstackConfirmationForm.get('id').value;
        this.updateFullstackConfirmationApi(dataRequest);
      }
    }
  }

  createFullstackConfirmationApi(dataRequest: RequestModel) {
    this._fConfirmationSvc
      .createFullstackConfirmation(dataRequest)
      .subscribe((resp: ResponseModel) => {
        if (resp.GeneralResponse.code === '0') {
          this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
          this.cleanForm();
          this.initialCharge(); // table
        } else {
          this._toastScv.showError(resp.GeneralResponse.messageCode);
        }
      });
  }

  updateFullstackConfirmationApi(dataRequest: RequestModel) {
    this._fConfirmationSvc
      .updateFullstackConfirmation(dataRequest)
      .subscribe((resp) => {
        if (resp.GeneralResponse.code === '0') {
          this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
          this.cleanForm();
          this.initialCharge(); // table
        } else {
          this._toastScv.showError(resp.GeneralResponse.messageCode);
        }
      });
  }

  updateFullstackConfirmation(data: FullstackConfirmationModel) {
    this.setForm(data);
    this.actionForm = 'update';
  }

  setForm(data: FullstackConfirmationModel) {
    this.fullstackConfirmationForm.reset({
      id: data.id,
      charge_service: data.charge_service,
      cust_num: data.cust_num,
      customer_id: data.customer_id,
      co_code: data.co_code,
      co_id: data.co_id,
      valid_from: data.valid_from,
      amount: data.amount,
      execute_date: data.execute_date,
      state: data.state,
      observation: data.observation,
    });
  }

  disableFullstackConfirmation(data: FullstackConfirmationModel) {
    const dataRequest: RequestModel = {
      FullstackConfirmation: {
        ...data,
        state: data.state.toString() === '0' ? '1' : '0',
      },
    };
    this.updateFullstackConfirmationApi(dataRequest);
  }

  deleteFullstackConfirmation(data: FullstackConfirmationModel) {
    this._fConfirmationSvc
      .deleteFullstackConfirmation(data.id)
      .subscribe((resp) => {
        if (resp.GeneralResponse.code === '0') {
          this._toastScv.showSuccess(resp.GeneralResponse.messageCode);
          this.initialCharge(); // table
        } else {
          this._toastScv.showError(resp.GeneralResponse.messageCode);
        }
      });
  }

  cleanForm() {
    this.fullstackConfirmationForm.reset({ state: '' });
    this.actionForm = 'create';
  }

  downloadDataTable() {
    if (this.dataToTable.length > 0) {
      this._gnrScv.exportDataToExcelFile(
        this.structureTable,
        this.dataToTable,
        'CONFIRMACION FULLSTACK'
      );
    }
  }
}
