import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static validatorRucPN(control: AbstractControl): { [s: string]: boolean } | null {
    if (!control || !control.value)
      return null;

    const substring = control.value.substring(0,2)
      if (substring == "10" || substring == "15" || substring == "17")
        return null;

    return { rucPNInvalid: true };
  }

  static validatorRucPJ(control: AbstractControl): { [s: string]: boolean } | null {
    if (!control || !control.value)
      return null;

    const substring = control.value.substring(0,2)
      if (substring == "20")
        return null;

    return { rucPJInvalid: true };
  }

  static validatorEmail(control: FormControl): { [s: string]: boolean } |null {
    if (!control || !control.value)
      return null;

    // const regex : RegExp = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
    // const regex : RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    // const regex : RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regex : RegExp = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (control.value.match(regex))
      return null;

    return { emailInvalid: true };
  }

  // static validatorRucOrEmpty(control: FormControl): { [s: string]: boolean } | null {
  //   if (!control || !control.value)
  //     return null;

  //   if (control.value.length == 0 || control.value.length == 11)
  //     return null;

  //   return { emailInvalid: true };
  // }

  static validatorMatchEmail(confirmEmailInput: string) {
    let confirmEmailControl: FormControl;
    let emailControl: FormControl;

    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      if (!confirmEmailControl) {
        confirmEmailControl = control;
        emailControl = control.parent.get(confirmEmailInput) as FormControl;
        emailControl.valueChanges.subscribe(() => {
          confirmEmailControl.updateValueAndValidity();
        });
      }

      if (emailControl.value?.toLowerCase() !== confirmEmailControl.value?.toLowerCase()
      ) {
        return { notMatch: true };
      }

      return null;
    };
  }

  static validatorMatchPassword(confirmPasswordInput: string) {
    let confirmPasswordControl: FormControl;
    let passwordControl: FormControl;

    return (control: FormControl) => {
      if (!control.parent)
        return null;

      if (!confirmPasswordControl) {
        confirmPasswordControl = control;
        passwordControl = control.parent.get(confirmPasswordInput) as FormControl;
        passwordControl.valueChanges.subscribe(() => {
          confirmPasswordControl.updateValueAndValidity();
        });
      }

      if (passwordControl.value !== confirmPasswordControl.value)
        return { notMatch: true };

      return null;
    };
  }

  static hasNumber(control: FormControl): { [s: string]: boolean } | null {
    if (!control || !control.value)
      return null;

    const regex : RegExp = /\d/;
    if (control.value.match(regex))
      return null;

    return { invalidHasNumber: true };
  }

  static hasCapitalCase(control: FormControl): { [s: string]: boolean } | null {
    if (!control || !control.value)
      return null;

    const regex : RegExp = /[A-Z]/;
    if (control.value.match(regex))
      return null;

    return { invalidHasCapitalCase: true };
  }

  static hasSmallCase(control: FormControl): { [s: string]: boolean } | null {
    if (!control || !control.value)
      return null;

    const regex : RegExp = /[a-z]/;
    if (control.value.match(regex))
      return null;

    return { invalidHasSmallCase: true };
  }

  static hasSpecialCharacters(control: FormControl): { [s: string]: boolean } | null {
    if (!control || !control.value)
      return null;

    const regex : RegExp = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (control.value.match(regex))
      return null;

    return { invalidHasSpecialCharacters: true };
  }

  static NoSpecialCharacters(control: FormControl): { [s: string]: boolean } | null {
    if (!control || !control.value)
      return null;
    const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!control.value.match(regex))
      return null;

    return { invalidNoSpecialCharacters: true };
  }

  static hasNumbersOnly(control: FormControl): { [s: string]: boolean } | null {
    if (!control || !control.value)
      return null;

    const regex = /^([0-9])*$/;
    if (control.value.match(regex))
      return null;

    return { invalidhasNumbersOnly: true };
  }

  static isCellPhone(control: FormControl): { [s: string]: boolean } | null {
    if (!control || !control.value)
      return null;

    const regex = /^[9]\d{8}$/;
    if (control.value.match(regex))
      return null;

    return { invalidCellPhone: true };
  }

  static exactLength(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const actualLength = control.value.length;
      if (actualLength === length) return null;

      return { exactLength: { requiredLength: length, actualLength: actualLength } };
    };
  }

  static betweenLength(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const actualLength = control.value.length;
      if (actualLength >= min && actualLength <= max) return null;

      return { betweenLength: { minLength: min, maxLength: max, actualLength: actualLength } };
    };
  }

  static noWhitespace(control: FormControl): ValidationErrors | null {
    if (control.value && /^\s|\s$/.test(control.value)) {
      return { noWhitespace: true };
    }
    return null;

  }

}
