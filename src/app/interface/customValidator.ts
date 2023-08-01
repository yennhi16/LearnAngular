import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { validateUserName } from "../service/validateUsername.service";
import { Observable, debounce, debounceTime, delay, map, of, switchMap, timer } from "rxjs";

export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): any => {
    let controlVal = control.value;
    let isWhitespace = (controlVal || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { whitespace: 'value is only whitespace' };
  };
}

export function validateUserNameFromApiDebounce(
  api: validateUserName
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    let time = new Date();
    console.log('validateUserNameFromApiDebounce', time);
    return of(control.value).pipe(
      delay(800),
      switchMap(() =>
        api.validateUsername(control.value).pipe(
          map((isValid) => {
            if (!isValid) {
              return null;
            }
            return {
              usernameDuplicated: true,
            };
          })
        )
      )
    );
  };
};

export function validateUserNameFromApi(
  api: validateUserName
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    let time = new Date()
    console.log('validateUserNameFromApi 222', time);
    return of(control.value).pipe(
      delay(2000),
      switchMap(() =>
        api.validateUsername(control.value).pipe(
          map((isValid) => {
            if (!isValid) {
              return null;
            }
            return {
              usernameDuplicated: true,
            };
          })
        )
      )
    );
  };
};
