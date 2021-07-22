import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourStringToDate'
})
export class HourStringToDatePipe implements PipeTransform {

  transform(value: Date | string, ...args: unknown[]): Date {
    let newDate: Date;
    if (typeof value == 'string') {
      newDate = new Date();
      const hour = parseInt( value.split(":")[0] );
      const min = parseInt( value.split(":")[1] );
      const sec = parseInt( value.split(":")[2] );
      newDate.setHours(hour, min, sec)
    } else {
      newDate = value
    }
    return newDate;
  }
}
