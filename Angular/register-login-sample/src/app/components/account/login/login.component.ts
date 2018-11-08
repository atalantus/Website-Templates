import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SettingsService} from '../../../services/settings.service';
import {AccountService} from '../../../services/account.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {User} from '../../../value-types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  waiting = false;
  tabIndex = 0;
  minPwdLength = 6;

  username = new FormControl('', [Validators.required, Validators.nullValidator]);
  password = new FormControl('', [Validators.required, Validators.nullValidator]);
  rememberMe = new FormControl('');

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
        } else if (this.password.invalid) {
          msg = this.getPasswordErrorMessage();
        }
        if (msg !== undefined) {
          this.snackBar.open(msg, null, {
            panelClass: ['darker-warning-snackbar', 'center-content-snackbar'],
            duration: 2000
          });
          this.waiting = false;
        } else {
          const username = this.username.value.toString();
          const usedUsername = !username.includes('@');
          const pwd = this.password.value.toString();

          this.accountService.login(username, usedUsername, pwd).subscribe((user) => {
            if (user === null) {
              this.waiting = false;
              this.snackBar.open(usedUsername ? 'Username or password incorrect!' : 'Email or password incorrect!', null, {
                panelClass: ['darker-warning-snackbar', 'center-content-snackbar'],
                duration: 2000
              });
            } else {
              this.login(user);
            }
          });
        }

        break;
      case 1:
        this.waiting = false;
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
    this.settingsService.loadSettings(account);
    this.accountService.user = account;
    this.router.navigateByUrl('/home');
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a Username' :
      this.username.hasError('taken') ? 'Username already taken' :
        '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a Password' :
      this.password.hasError('minlength') ? `Password must be at least ${this.minPwdLength} characters long` :
        '';
  }
}
