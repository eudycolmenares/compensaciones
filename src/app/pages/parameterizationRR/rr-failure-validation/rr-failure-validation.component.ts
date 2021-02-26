import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralFunctionsService } from '../../../services/general-functions.service';
import {
  RRServicesFailure,
  ServicesSettings,
} from '../../../libraries/utilities.library';
import { DataList } from '../../../models/general';
import { ToastService } from 'src/app/services/shared/toast.service';
import { RrFailureValidationService } from 'src/app/services/rrFailureValidation/rr-failure-validation.service';
import * as models from '../../../models/rr-failure-validation';

@Component({
  selector: 'app-rr-failure-validation',
  templateUrl: './rr-failure-validation.component.html',
  styleUrls: ['./rr-failure-validation.component.scss'],
})
export class RrFailureValidationComponent implements OnInit {
  rrFailureForm: FormGroup;
  formOption1: FormGroup;
  formOption2: FormGroup;
  formOption3: FormGroup;
  selectTable: DataList[] = [];
  selectService: DataList[] = [];
  selectedForm: number = null;
  actionForm = 'create'; // create, update

  // table
  dataToTable: object[];
  structure: object[] = [];

  //download file
  columNames: { english: string[]; spanish: string[] };
  name_selectedTable: DataList;
  dataRequest: any;

  constructor(
    private _fb: FormBuilder,
    private _RrfailureValidationScv: RrFailureValidationService,
    private _gnrScv: GeneralFunctionsService,
    private _toastScv: ToastService
  ) {
    this.createForm();
    this.initializeVariables();
  }

  createForm() {
    this.rrFailureForm = this._fb.group({
      tableOptions: ['', [Validators.required]],
    });
    this.rrFailureForm
      .get('tableOptions')
      .valueChanges.subscribe((selectValue) => {
        this.selectedTableRrFailure(selectValue);
      });

    // options form - selected of rrFailureForm
    this.formOption1 = this._fb.group({
      id: [''],
      issue: ['', [Validators.required]],
      node: ['', [Validators.required]],
      cause: ['', [Validators.required]],
      time: ['', [Validators.required]],
      service: ['', [Validators.required]],
    });
    this.formOption2 = this._fb.group({
      id: [''],
      account: ['', [Validators.required]],
      call: ['', [Validators.required]],
      time: ['', [Validators.required]],
      service: ['', [Validators.required]],
    });
    this.formOption3 = this._fb.group({
      id: [''],
      account: ['', [Validators.required]],
      incident: ['', [Validators.required]],
      service: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  invalidFieldForm(fieldName: string) {
    return (
      this.rrFailureForm.get(fieldName).touched &&
      this.rrFailureForm.get(fieldName).invalid
    );
  }

  invalidField_FormOption1(fieldName: string) {
    return (
      this.formOption1.get(fieldName).touched &&
      this.formOption1.get(fieldName).invalid
    );
  }

  invalidField_FormOption2(fieldName: string) {
    return (
      this.formOption2.get(fieldName).touched &&
      this.formOption2.get(fieldName).invalid
    );
  }

  invalidField_FormOption3(fieldName: string) {
    return (
      this.formOption3.get(fieldName).touched &&
      this.formOption3.get(fieldName).invalid
    );
  }

  textsFormInvalid(field: string) {
    return this._gnrScv.validationFormTextRequired(this.rrFailureForm, field);
  }

  textsFormInvalid_formOption1(field: string) {
    return this._gnrScv.validationFormTextRequired(this.formOption1, field);
  }

  textsFormInvalid_formOption2(field: string) {
    return this._gnrScv.validationFormTextRequired(this.formOption2, field);
  }

  textsFormInvalid_formOption3(field: string) {
    return this._gnrScv.validationFormTextRequired(this.formOption3, field);
  }

  initializeVariables() {
    for (const i of Object.entries(RRServicesFailure)) {
      this.selectTable.push({ key: i[0], value: i[1] });
    }
    for (const i of Object.entries(ServicesSettings)) {
      this.selectService.push({ key: i[0], value: i[1] });
    }
  }

  selectedTableRrFailure(selectTable) {
    switch (selectTable) {
      case this.selectTable[0].key: // by_nodo_4296_Tel_Int_48h
        this.structure = this._RrfailureValidationScv.structureIntTelNodes48H().structure;
        this._RrfailureValidationScv
          .allIntTelNodes48H()
          .subscribe((resp: models.IntTelNodes48HApiModel) => {
            this.dataToTable = resp.IntTelNodes48H.IntTelNode48H;
          });
        this.columNames = this._RrfailureValidationScv.structureIntTelNodes48H().columNames;
        this.name_selectedTable = this.selectTable[0];
        this.selectedForm = 1;
        break;

      case this.selectTable[1].key: // by_nodo_acuer11_2006_TV16H
        this.structure = this._RrfailureValidationScv.structureTvNodes16H().structure;
        this._RrfailureValidationScv
          .allTvNodes16H()
          .subscribe((resp: models.TvNodes16HApiModel) => {
            this.dataToTable = resp.TvNodes16H.TvNode16H;
          });
        this.columNames = this._RrfailureValidationScv.structureTvNodes16H().columNames;
        this.name_selectedTable = this.selectTable[1];
        this.selectedForm = 1;
        break;

      case this.selectTable[2].key: // compens_arreglo_TV16H
        this.structure = this._RrfailureValidationScv.structureTvSettings16H().structure;
        this._RrfailureValidationScv
          .allTvSettings16H()
          .subscribe((resp: models.TvSettings16HApiModel) => {
            this.dataToTable = resp.TvSettings16H.TvSetting16H;
          });
        this.columNames = this._RrfailureValidationScv.structureTvSettings16H().columNames;
        this.name_selectedTable = this.selectTable[2];
        this.selectedForm = 2;
        break;

      case this.selectTable[3].key: // compens_arreglos_telef_48H
        this.structure = this._RrfailureValidationScv.structureTelepSettlemCompensas().structure;
        this._RrfailureValidationScv
          .allTelepSettlemCompensas()
          .subscribe((resp: models.TelepSettlemCompensasApiModel) => {
            this.dataToTable =
              resp.TblArrangementTelInt48h.TblArrangementTelInt48h;
          });
        this.columNames = this._RrfailureValidationScv.structureTelepSettlemCompensas().columNames;
        this.name_selectedTable = this.selectTable[3];
        this.selectedForm = 2;
        break;

      case this.selectTable[4].key: // compes_telef_48H
        this.structure = this._RrfailureValidationScv.structureTelepCompensas().structure;
        this._RrfailureValidationScv
          .allTelepCompensas()
          .subscribe((resp: models.TelepCompensasApiModel) => {
            this.dataToTable = resp.TblCompesTelInt48h.TblCompesTelInt48h;
          });
        this.columNames = this._RrfailureValidationScv.structureTelepCompensas().columNames;
        this.name_selectedTable = this.selectTable[4];
        this.selectedForm = 3;
        break;

      case this.selectTable[5].key: // compes_TV_16H
        this.structure = this._RrfailureValidationScv.structureTelevCompensas().structure;
        this._RrfailureValidationScv
          .allTelevCompensas()
          .subscribe((resp: models.TelevCompensasApiModel) => {
            this.dataToTable = resp.TblCompesTv16h.TblCompesTv16h;
          });
        this.columNames = this._RrfailureValidationScv.structureTelevCompensas().columNames;
        this.name_selectedTable = this.selectTable[5];
        this.selectedForm = 3;
        break;

      case this.selectTable[6].key: // improcedencia_falla_masiva
        this.structure = this._RrfailureValidationScv.structureMassImproperFailures().structure;
        this._RrfailureValidationScv
          .allMassImproperFailures()
          .subscribe((resp: models.MassImproperFailuresApiModel) => {
            this.dataToTable =
              resp.TblImprocedureCompensation.TblImprocedureCompensation;
          });
        this.columNames = this._RrfailureValidationScv.structureMassImproperFailures().columNames;
        this.name_selectedTable = this.selectTable[6];
        this.selectedForm = 3;
        break;

      default:
        this.structure = [];
        this.dataToTable = null;
        this.selectedForm = null;
        break;
    }
    this.cleanForm();
  }

  reloadTableData() {
    this.selectedTableRrFailure(this.name_selectedTable.key);
  }

  downloadDataTable() {
    if (this.dataToTable.length > 0) {
      this.exportToCsv(this.dataToTable);
    }
  }

  cleanForm() {
    switch (this.selectedForm) {
      case 1:
        this.formOption1.reset({});

        break;

      case 2:
        this.formOption2.reset({});
        break;

      case 3:
        this.formOption3.reset({});
        break;

      default:
        break;
    }
    this.actionForm = 'create';
  }

  exportToCsv(rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }

    const separator = '|';
    const keys = this.columNames.english;
    const keysSpanish = this.columNames.spanish;
    const csvContent =
      keysSpanish.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell.toLocaleString();
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/html;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, this.name_selectedTable.value + '.txt');
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', this.name_selectedTable.value + '.txt');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this._toastScv.showSuccess('Archivo descargado correctamente');
      }
    }
  }

  onSubmit_formOption1() {
    console.log(this.formOption1.value);
    if (this.formOption1.invalid) {
      return Object.values(this.formOption1.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.structuredData();
    }
  }

  onSubmit_formOption2() {
    console.log(this.formOption2.value);
    if (this.formOption2.invalid) {
      return Object.values(this.formOption2.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.structuredData();
    }
  }

  onSubmit_formOption3() {
    console.log(this.formOption3.value);
    if (this.formOption3.invalid) {
      return Object.values(this.formOption3.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.structuredData();
    }
  }

  structuredData() {
    this.ApiOptions('structureData');

    if (this.actionForm === 'create') {
      this.ApiOptions('createData');
    } else {
      this.ApiOptions('updateData');
    }
  }

  ApiOptions(actionApi: string, dataAditionals?: Object[]) {
    switch (this.name_selectedTable.value) {
      case this.selectTable[0].value: // By_nodo_4296_Tel_Int_48h
        if (actionApi === 'structureData') {
          this.dataRequest = this._RrfailureValidationScv.structureRequest_IntTelNode48H(
            this.formOption1.value
          );
        } else if (actionApi === 'createData') {
          this._RrfailureValidationScv
            .createRequest_IntTelNode48H(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrfailureValidationScv
            .updateRequest_IntTelNode48H(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrfailureValidationScv
            .deleteRequest_IntTelNode48H(dataAditionals['id'])
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      case this.selectTable[1].value: // By_nodo_acuer11_2006_TV16H
        if (actionApi === 'structureData') {
          this.dataRequest = this._RrfailureValidationScv.structureRequest_TvNode16H(
            this.formOption1.value
          );
        } else if (actionApi === 'createData') {
          this._RrfailureValidationScv
            .createRequest_TvNode16H(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrfailureValidationScv
            .updateRequest_TvNode16H(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrfailureValidationScv
            .deleteRequest_TvNode16H(dataAditionals['id'])
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      case this.selectTable[2].value: // Compens_arreglo_TV16H
        if (actionApi === 'structureData') {
          this.dataRequest = this._RrfailureValidationScv.structureRequest_TvSetting16H(
            this.formOption2.value
          );
        } else if (actionApi === 'createData') {
          this._RrfailureValidationScv
            .createRequest_TvSetting16H(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrfailureValidationScv
            .updateRequest_TvSetting16H(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrfailureValidationScv
            .deleteRequest_TvSetting16H(dataAditionals['id'])
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      case this.selectTable[3].value: // Compens_arreglos_telef_48H
        if (actionApi === 'structureData') {
          this.dataRequest = this._RrfailureValidationScv.structureRequest_TelepSettlemCompensa(
            this.formOption2.value
          );
        } else if (actionApi === 'createData') {
          this._RrfailureValidationScv
            .createRequest_TelepSettlemCompensa(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrfailureValidationScv
            .updateRequest_TelepSettlemCompensa(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrfailureValidationScv
            .deleteRequest_TelepSettlemCompensa(
              dataAditionals['idTblArrangementTelInt48h']
            )
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      case this.selectTable[4].value: // Compes_telef_48H
        if (actionApi === 'structureData') {
          this.dataRequest = this._RrfailureValidationScv.structureRequest_TelepCompensa(
            this.formOption3.value
          );
        } else if (actionApi === 'createData') {
          this._RrfailureValidationScv
            .createRequest_TelepCompensa(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrfailureValidationScv
            .updateRequest_TelepCompensa(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrfailureValidationScv
            .deleteRequest_TelepCompensa(
              dataAditionals['idTblTelIntCompe48h']
            )
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      case this.selectTable[5].value: // Compes_TV_16H
        if (actionApi === 'structureData') {
          this.dataRequest = this._RrfailureValidationScv.structureRequest_TelevCompensa(
            this.formOption3.value
          );
        } else if (actionApi === 'createData') {
          this._RrfailureValidationScv
            .createRequest_TelevCompensa(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrfailureValidationScv
            .updateRequest_TelevCompensa(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrfailureValidationScv
            .deleteRequest_TelevCompensa(
              dataAditionals['idTblTvCompe16h']
            )
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      case this.selectTable[6].value: // Improcedencia_falla_masiva
        if (actionApi === 'structureData') {
          this.dataRequest = this._RrfailureValidationScv.structureRequest_MassImproperFailure(
            this.formOption3.value
          );
        } else if (actionApi === 'createData') {
          this._RrfailureValidationScv
            .createRequest_MassImproperFailure(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'updateData') {
          this._RrfailureValidationScv
            .updateRequest_MassImproperFailure(this.dataRequest)
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        } else if (actionApi === 'deleteData') {
          this._RrfailureValidationScv
            .deleteRequest_MassImproperFailure(
              dataAditionals['idTblImprocedureCompensation']
            )
            .subscribe((resp: models.ResponseModel) => {
              this.messageToCustomer(resp);
            });
        }
        break;

      default:
        break;
    }
  }

  messageToCustomer(resp: models.ResponseModel) {
    if (resp.GeneralResponse.code === '0') {
      this._toastScv.showSuccess(
        resp.GeneralResponse.messageCode,
        resp.GeneralResponse.descriptionCode,
      );
      this.cleanForm();
      this.reloadTableData();
    } else {
      this._toastScv.showError(
        resp.GeneralResponse.messageCode,
        resp.GeneralResponse.descriptionCode,
      );
    }
  }

  updateData(dataSelected: any) {
    this.scrollUp();
    this.setForm(dataSelected);
    this.actionForm = 'update';
  }

  setForm(data: any) {
    switch (this.selectedForm) {
      case 1:
        this.formOption1.reset({
          id: data.id,
          issue: data.issue,
          node: data.node,
          cause: data.cause,
          time: data.time,
          service: this.returnServiceName(data.service),
        });

        break;

      case 2:
        this.formOption2.reset({
          id: data.id || data.idTblArrangementTelInt48h,
          account: data.account,
          call: data.call,
          time: data.time,
          service: this.returnServiceName(data.service),
        });
        break;

      case 3:
        this.formOption3.reset({
          id: data.idTblTelIntCompe48h || data.idTblTvCompe16h || data.idTblImprocedureCompensation,
          account: data.account,
          incident: data.incident,
          service: this.returnServiceName(data.service),
          time: data.time,
        });
        break;

      default:
        break;
    }
  }

  scrollUp() {
    document
      .getElementById('editScrollTop')
      .scrollIntoView({ behavior: 'smooth' });
  }

  returnServiceName(dataServices: string): string[] {
    let arrayServices = dataServices.split(',');
    let svcSelected = [];

    for (const iterator of arrayServices) {
      if (iterator === 'Telefonía') {
        svcSelected.push(
          this.selectService.filter((svc) => svc.key === 'telephone')[0]
        );
      }
      if (iterator === 'Televisión') {
        svcSelected.push(
          this.selectService.filter((svc) => svc.key === 'television')[0]
        );
      }
      if (iterator === 'Internet') {
        svcSelected.push(
          this.selectService.filter((svc) => svc.key === 'internet')[0]
        );
      }
    }
    return svcSelected;
  }

  deleteData(dataSelected: Object[]) {
    this.ApiOptions('deleteData', dataSelected);
  }
}
