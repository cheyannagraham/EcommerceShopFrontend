import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function noWhitespace(): ValidatorFn {
  return (control:AbstractControl): ValidationErrors | null => {
    return control.value?.trim().length > 1 ? null : {noWhitespace: true};
  }

}
