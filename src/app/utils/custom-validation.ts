import { AbstractControl } from '@angular/forms';

export class CustomValidation {
  static fileIsAllowed(validExtension: string[]) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let typeFileUploaded = control.value;
      if (control.value) {
        typeFileUploaded = typeFileUploaded.split('.').pop();
        if (!validExtension.find(item => item == typeFileUploaded)) {
          return { fileIsAllowed: true };
        }
      }
      return null;
    };
  }
}
