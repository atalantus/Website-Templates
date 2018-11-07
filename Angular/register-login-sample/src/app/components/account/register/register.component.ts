import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {AccountService} from '../../../services/account.service';
import {SettingsService} from '../../../services/settings.service';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../../../value-types/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  waiting = false;
  tabIndex = 0;
  minPwdLength = 6;

  username = new FormControl('', [Validators.required, Validators.nullValidator]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(this.minPwdLength)]);
  passwordRepeat = new FormControl('', [Validators.required, Validators.nullValidator, this.matchesPassword()]);

  constructor(public settingsService: SettingsService,
              private accountService: AccountService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.waiting = true;
    switch (this.tabIndex) {
      case 0:
        console.log('GHC');

        let msg: string;
        if (this.username.invalid) {
          msg = this.getUsernameErrorMessage();
        } else if (this.email.invalid) {
          msg = this.getEmailErrorMessage();
        } else if (this.password.invalid) {
          msg = this.getPasswordErrorMessage();
        } else if (this.passwordRepeat.invalid) {
          msg = this.getPasswordRepeatErrorMessage();
        }

        if (msg !== undefined) {
          this.snackBar.open(msg, null, {
            panelClass: ['darker-warning-snackbar', 'center-content-snackbar'],
            duration: 2000
          });
          this.waiting = false;
        } else {
          this.accountService.createAccount(new User(this.username.value, this.email.value, this.password.value)).subscribe(resp => {
            this.waiting = false;

            switch (resp.status) {
              case 201:
                this.login(resp.body);
                break;
              default:
                this.snackBar.open(`ERROR ${resp.status}: ${resp.statusText}`, null, {
                  panelClass: ['darker-warning-snackbar', 'center-content-snackbar'],
                  duration: 2000
                });
            }
          });
        }

        break;
      case 1:
        this.snackBar.open(`Implement this yourself!`, null, {
          panelClass: ['center-content-snackbar'],
          duration: 2000
        });
        break;
    }
  }

  login(account: User) {
    // TODO: Login
    console.log(`Login: ${account.username}`);
    this.accountService.user = account;
    this.router.navigateByUrl('./home');
  }

  matchesPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const matches = this.password.value === control.value;
      return matches ? null : {'matchpwd': {value: control.value}};
    };
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a Username' :
      this.username.hasError('taken') ? 'Username already taken' :
        '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter an Email' :
      this.email.hasError('email') ? 'Not a valid Email' :
        this.email.hasError('taken') ? 'This Email is already being used' :
          '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a Password' :
      this.password.hasError('minlength') ? `Password must be at least ${this.minPwdLength} characters long` :
        '';
  }

  getPasswordRepeatErrorMessage() {
    return this.passwordRepeat.hasError('required') ? 'You must repeat your Password' :
      this.passwordRepeat.hasError('matchpwd') ? 'Passwords do not match' :
        '';
  }
}
