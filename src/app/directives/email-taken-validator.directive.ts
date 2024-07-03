import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './../auth.service';

@Directive({
  standalone: true,
  selector: '[appEmailTakenValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: EmailTakenValidatorDirective, multi: true }]
})
export class EmailTakenValidatorDirective implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    // Convert the Promise returned by isEmailTaken to an Observable
    return from(this.authService.isEmailTaken(control.value)).pipe(
      map(isTaken => (isTaken ? { emailTaken: true } : null)),
      catchError(() => of(null)) // Handle errors by returning an Observable that emits null
    );
  }
}
