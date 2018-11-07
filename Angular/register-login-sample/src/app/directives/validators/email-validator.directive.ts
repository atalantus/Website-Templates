import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements AsyncValidator {

  constructor(private accountService: AccountService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.accountService.isEmailTaken(control.value).pipe(
      map(isTaken => isTaken ? {'taken': true} : null),
      catchError(() => null)
    );
  }
}
