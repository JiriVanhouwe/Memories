import { Component, OnInit } from '@angular/core';
import { ValidationErrors, ValidatorFn, AbstractControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);
    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>  //n = emailadres, return een validator function
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map((available) => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;
  public errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authService.checkUserNameAvailability),
      ],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              patternValidator(/\d/, { hasNumber: true }),
              patternValidator(/[A-Z]/, { hasUpperCase: true }),
              patternValidator(/[a-z]/, { hasLowerCase: true }),
            ],
          ],
          confirmPassword: ['', Validators.required],
        },
        { validator: comparePasswords }
      ),
    });
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'Dit is verplicht.';
    } else if (errors.minlength) {
      return `Minstens ${errors.minlength.requiredLength} karakters (momenteel ${errors.minlength.actualLength})`;
    } else if (errors.hasNumber) {
      return `Minstens 1 nummer nodig.`;
    } else if (errors.hasUpperCase) {
      return `Minstens 1 hoofdletter nodig.`;
    } else if (errors.hasNumber) {
      return `Minstens 1 kleine letter nodig`;
    } else if (errors.userAlreadyExists) {
      return `Deze gebruikersnaam bestaat al.`;
    } else if (errors.email) {
      return `Dit is geen geldig e-mailadres.`;
    } else if (errors.passwordsDiffer) {
      return `De paswoorden komen niet overeen.`;
    }
  }

  onSubmit() {
    this.authService
      .register(
        this.user.value.firstname,
        this.user.value.lastname,
        this.user.value.email,
        this.user.value.passwordGroup.password
      )
      .subscribe(
        (val) => {
          if (val) {
            this.router.navigate(["/memories"]);
          } else {
            this.errorMessage = `Registreren mislukt.`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMessage = `Fout bij registreren ${this.user.value.email}: ${err.error.message}`;
          } else {
            this.errorMessage = `Fout ${err.status} tijdens inloggen van ${this.user.value.email}: ${err.error}`;
          }
        }
      );
  }
}
