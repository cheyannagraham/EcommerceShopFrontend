import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function noWhitespace(): ValidatorFn {
  return (control:AbstractControl): ValidationErrors | null => {
    const value = control.value
    return value.trim().length > 0 ? null : {noWhitespace: true};
  }

}
