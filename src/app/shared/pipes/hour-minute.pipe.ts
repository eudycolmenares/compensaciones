import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourMinute'
})
export class HourMinutePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if (typeof(value) != 'number') {
      return value;
    }
    const h = value.toString().split('.');
    return `${h[0]}h ${h[0]}m`;
  }

}
