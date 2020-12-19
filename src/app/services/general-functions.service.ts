import { Injectable, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class GeneralFunctionsService {

  constructor() {
   }

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
    return data.name.toLowerCase().includes(term)
      || data.description.toLowerCase().includes(term)
      || data.compensate.toLowerCase().includes(term)
      || data.user.toLowerCase().includes(term)
      || data.state.toLowerCase().includes(term);
  }

  validationFormTextRequired(form: FormGroup, field: string) {
    return form.get(field).hasError('required')
      ? 'El campo es obligatorio'
      : !form.get(field).hasError('maxLength')
      ? 'El campo supera lo permitido'
      : '';
  }
}
