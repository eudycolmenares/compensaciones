import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as models from 'src/app/models/billing-periods';
import { SelectCompensate } from '../../../libraries/utilities.library';
import { DataList } from '../../../models/general';
import { BillingPeriodsService } from '../../../services/billingPeriods/billing-periods.service';
import { GeneralFunctionsService } from '../../../services/general-functions.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-billing-periods',
  templateUrl: './billing-periods.component.html',
  styleUrls: ['./billing-periods.component.scss'],
})
export class BillingPeriodsComponent implements OnInit {
  billingPeriodForm: FormGroup;
  selectYesNo: DataList[] = [];
  actionForm = 'create'; // create, update

  // table
  dataToTable: object[];
  structure: object[] = [
    {
      name: 'pediodId',
      description: 'Periodo de facturación',
      validation: 'period',
    },
    {
      name: 'startDate',
      description: 'Fecha inico',
      validation: 'date',
    },
    {
      name: 'endDate',
      description: 'Fecha fin',
      validation: 'date',
    },
  ];

  constructor(
    private _fb: FormBuilder,
    private _billingPeriodSvc: BillingPeriodsService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.billingPeriodForm = this._fb.group({
      pediodId: [''],
      invoiced: [''],
      billingDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  initializeVariables() {
    for (const i of Object.entries(SelectCompensate)) {
      this.selectYesNo.push({ key: i[1], value: i[0] });
    }
    this.selectYesNo.splice(0, 1, { key: '', value: '- Seleccione -' });

    this.initialCharge(); // table
  }

  initialCharge() {
    this._billingPeriodSvc
      .allBillingPeriods()
      .subscribe((resp: models.BillingPeriodsApiModel) => {
        this.dataToTable = resp.tblBillingPeriods;
        this.dataToTable.forEach((data: models.BillingPeriodModel) => {
          data.startDate = this._gnrScv.formatDate_billingPeriods(
            data.startDate
          );
          data.endDate = this._gnrScv.formatDate_billingPeriods(data.endDate);
        });
      });
  }

  invalidFieldForm(fieldName: string) {
    return (
      this.billingPeriodForm.get(fieldName).touched &&
      this.billingPeriodForm.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(
      this.billingPeriodForm,
      field
    );
  }

  onSubmit() {
    console.log(this.billingPeriodForm.value);

    if (this.billingPeriodForm.invalid) {
      return Object.values(this.billingPeriodForm.controls).forEach(
        (control) => {
          control.markAsTouched();
        }
      );
    } else {
      let dataRequest: models.RequestModel = this.structuredData();

      if (this.actionForm === 'create') {
        this.createBillingPeriodApi(dataRequest);
      } else {
        dataRequest.TblBillingPeriods.pediodId = this.billingPeriodForm.get(
          'pediodId'
        ).value;
        this.updateBillingPeriodApi(dataRequest);
      }
    }
  }

  structuredData() {
    let data: models.RequestModel = {
      TblBillingPeriods: {
        startDate: this._gnrScv.formatDate(
          'DD/MM/YYYY',
          this.billingPeriodForm.get('billingDate').value[0]
        ),
        endDate: this._gnrScv.formatDate(
          'DD/MM/YYYY',
          this.billingPeriodForm.get('billingDate').value[1]
        ),
        invoiced: this.billingPeriodForm.get('invoiced').value,
      },
    };
    return data;
  }

  createBillingPeriodApi(dataRequest: models.RequestModel) {
    this._billingPeriodSvc
      .actionsBillingPeriod(dataRequest, 'create')
      .then((resp: models.ResponseModel) => {
        this.messageToCustomer(resp);
      });
  }

  updateBillingPeriodApi(dataRequest: models.RequestModel) {
    this._billingPeriodSvc
      .actionsBillingPeriod(dataRequest, 'update')
      .then((resp: models.ResponseModel) => {
        this.messageToCustomer(resp);
      });
  }

  messageToCustomer(resp: models.ResponseModel) {
    if (resp.generalResponse.code === '0') {
      this._toastScv.showSuccess(
        resp.generalResponse.messageCode,
        resp.generalResponse.descriptionCode
      );
      this.cleanForm();
      this.initialCharge(); // table
    } else {
      this._toastScv.showError(
        resp.generalResponse.messageCode,
        resp.generalResponse.descriptionCode
      );
    }
  }

  updateBillingPeriod(billingPeriod: models.BillingPeriodModel) {
    this.scrollUp();
    this.setForm(billingPeriod);
    this.actionForm = 'update';
  }

  scrollUp() {
    document
      .getElementById('editScrollTop')
      .scrollIntoView({ behavior: 'smooth' });
  }

  setForm(data: models.BillingPeriodModel) {
    this.billingPeriodForm.reset({
      pediodId: data.pediodId,
      billingDate: [data.startDate, data.endDate],
      invoiced: data.invoiced,
    });
    console.log(this.billingPeriodForm.value);
  }

  deleteBillingPeriod(billingPeriod: models.BillingPeriodModel) {
    this._billingPeriodSvc
      .actionsBillingPeriod(
        {
          TblBillingPeriods: {
            ...billingPeriod,
            startDate: this._gnrScv.formatDate(
              'DD/MM/YYYY',
              billingPeriod.startDate
            ),
            endDate: this._gnrScv.formatDate(
              'DD/MM/YYYY',
              billingPeriod.endDate
            ),
          },
        },
        'delete'
      )
      .then((resp: models.ResponseModel) => {
        this.messageToCustomer(resp);
      });
  }

  cleanForm() {
    this.billingPeriodForm.reset();
    this.actionForm = 'create';
  }
}
