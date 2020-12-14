import { Injectable, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TaskModel } from '../models/task';

@Injectable({
  providedIn: 'root'
})

export class GeneralFunctionsService {

  constructor() { }

  compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  sort(tasks: TaskModel[], column: string, direction: string): TaskModel[] {
    console.log('sort():', tasks, column, direction);
    if (direction === '') {
      return tasks;
    } else {
      return [...tasks].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  matches(task: TaskModel, term: string, pipe: PipeTransform) {
    return task.period.toLowerCase().includes(term)
      || task.date.toLowerCase().includes(term)
      || task.time.toLowerCase().includes(term)
      || task.status.toLowerCase().includes(term);
    // return country.name.toLowerCase().includes(term)
    //   || pipe.transform(country.area).includes(term)
    //   || pipe.transform(country.population).includes(term);
  }

  validationFormTextRequired(form: FormGroup, field: string) {
    return form.get(field).hasError('required')
      ? 'El campo es obligatorio'
      : !form.get(field).hasError('maxLength')
      ? 'El campo supera lo permitido'
      : '';
  }
}
