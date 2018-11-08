import {Injectable} from '@angular/core';
import {Settings} from '../value-types/settings';
import {User} from '../value-types/user';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings: Settings;

  constructor() {
  }

  public loadSettings(account: User) {
    this.settings = new Settings();
  }
}
