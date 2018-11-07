import {Component, OnInit, Renderer2} from '@angular/core';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public settingsService: SettingsService, private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  toggleTheme() {
    this.settingsService.isLightTheme ? this.renderer.removeClass(document.body, 'light') : this.renderer.addClass(document.body, 'light');
    this.settingsService.isLightTheme = !this.settingsService.isLightTheme;
  }
}
