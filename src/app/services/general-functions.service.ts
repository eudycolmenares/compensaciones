import { Injectable, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';

import { ToastService } from '../shared/services/toast.service';
import { estructTableModel as tableModel } from '../shared/models/parameters';
import { exportExcelParams as excelParams } from '../libraries/utilities.library';

@Injectable({
  providedIn: 'root',
})
export class GeneralFunctionsService {
  constructor(private toastScv: ToastService) {}

  compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  sort(tasks: any[], column: string, direction: string): any[] {
    if (direction === '') {
      return tasks;
    } else {
      return [...tasks].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  matches(data: any, term: string, pipe: PipeTransform) {
    return (
      data.name.toLowerCase().includes(term) ||
      data.description.toLowerCase().includes(term) ||
      data.compensate.toLowerCase().includes(term) ||
      data.user.toLowerCase().includes(term) ||
      data.state.toLowerCase().includes(term)
    );
  }

  validationFormTextRequired(form: FormGroup, field: string) {
    return form.get(field).hasError('required')
      ? 'El campo es obligatorio'
      : form.get(field).hasError('fileIsAllowed')
      ? 'El tipo de archivo no es válido'
      : !form.get(field).hasError('maxLength')
      ? 'El campo supera lo permitido'
      : '';
  }

  formatDate(template, customDate) {
    var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
    var date = new Date(customDate);

    return date
      .toISOString()
      .split(/[-:.TZ]/)
      .reduce(function (template, item, i) {
        return template.split(specs[i]).join(item);
      }, template);
  }

  toISOLocal(d) {
    var z = (n) => (n < 10 ? '0' : '') + n;
    var off = d.getTimezoneOffset();
    off = Math.abs(off);

    return (
      d.getFullYear() +
      z(d.getMonth() + 1) +
      z(d.getDate()) +
      z(d.getHours()) +
      z(d.getMinutes()) +
      z(d.getSeconds())
    );
  }

  formatDate_billingPeriods(date) {
    date = date.split('/');
    date = date[2] + '/' + date[1] + '/' + date[0];
    return new Date(date);
  }

  returnTypeFaultsReadable(value: string): string {
    switch (value) {
      case 'RESIDENTIAL_BASE':
        return 'Residencial';
      case 'BUILDINGS_BASE':
        return 'Edificios';
      case 'SME_BASE':
        return 'Pymes';
      case 'RESIDENTIAL_SETTING':
        return 'Ajustes Residencial';
      case 'SME_SETTING':
        return 'Ajustes Pymes';
      case 'MAINTENANCE_ORDER':
        return 'Órdenes Mantenimiento';
      case 'ACCOUNT_RENT':
        return 'Cuentas Rentas';
      case 'NODES_RENT':
        return 'Nodos Rentas';
    }
  }

  removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Methods to export EXCEL
  exportDataToExcelFile(
    estructure: tableModel[],
    data: object[],
    useCase: string
  ) {
    let rowsEng: string[] = [];
    let rowsSpa: string[] = [];
    estructure.forEach((data) => {
      rowsSpa.push(this.removeAccents(data.description.toLocaleUpperCase()));
      rowsEng.push(data.name);
    });
    if (useCase === 'CAUSAS NUEVAS') {
      rowsSpa.splice(
        3,
        0,
        this.removeAccents('Tipo Origen').toLocaleUpperCase()
      );
      rowsEng.splice(3, 0, '');
    }
    this.exportAsExcelFile(data, rowsEng, rowsSpa, useCase);
  }
  private exportAsExcelFile(json: object[], rowsEng, rowsSpa, useCase): void {
    const csvContent = json.map((row) => {
      return rowsEng.map((k) => {
        let cell = row[k] === null || row[k] === undefined ? '' : row[k];
        return cell;
      });
    });
    var worksheet = XLSX.utils.json_to_sheet([], { header: rowsSpa });
    worksheet = XLSX.utils.sheet_add_json(worksheet, csvContent, {
      skipHeader: true,
      origin: 'A2',
    });
    const workbook: XLSX.WorkBook = {
      Sheets: { [useCase]: worksheet },
      SheetNames: [useCase],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, useCase);
  }
  private saveAsExcelFile(buffer: any, useCase: string): void {
    const blob: Blob = new Blob([buffer], { type: excelParams.excelType });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(
        blob,
        excelParams.case[useCase] + this.toISOLocal(new Date()) + excelParams.excelExt
      );
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          excelParams.case[useCase] +
            this.toISOLocal(new Date()) +
            excelParams.excelExt
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.toastScv.showSuccess(excelParams.msgSuccess);
      }
    }
  }

  // Methods to export CSV
  exportToCsv(
    rows: object[],
    columNames: { english: string[]; spanish: string[] },
    nameFile
  ) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ';';
    const keys = columNames.english;
    const keysSpanish = columNames.spanish;
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
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, nameFile + '.csv');
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', nameFile + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.toastScv.showSuccess('Archivo descargado correctamente');
      }
    }
  }
}
