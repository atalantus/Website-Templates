import {Component, OnInit, Renderer2} from '@angular/core';
import {SettingsService} from '../../../services/settings.service';
import {AccountService} from '../../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public settingsService: SettingsService,
              public accountService: AccountService,
              private renderer: Renderer2,
              private router: Router) {
  }

  ngOnInit() {
  }

  toggleTheme() {
    this.settingsService.settings.isLightTheme ? this.renderer.removeClass(document.body, 'light') : this.renderer.addClass(document.body, 'light');
    this.settingsService.settings.isLightTheme = !this.settingsService.settings.isLightTheme;
  }

  logout() {
    this.accountService.user = undefined;
    this.router.navigateByUrl('/login');
  }
}
