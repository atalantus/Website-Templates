import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public isLightTheme: boolean;

  constructor() {
  }
}
