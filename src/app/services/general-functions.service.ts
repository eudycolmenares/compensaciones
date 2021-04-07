import { Injectable, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GeneralFunctionsService {
  constructor() {}

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
    console.log('date', date);

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
      ' ' +
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
}
