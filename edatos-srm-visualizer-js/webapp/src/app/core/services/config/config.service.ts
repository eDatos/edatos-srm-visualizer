import { Injectable } from '@angular/core';
import { GenericConfig } from 'src/app/shared/models/generic-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  getConfig (): GenericConfig {
    return (<any>window).CONFIGURATION;
  }
}
