import {Injectable} from '@angular/core';
import {Settings} from '../value-types/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings: Settings;

  constructor() {
  }
}
