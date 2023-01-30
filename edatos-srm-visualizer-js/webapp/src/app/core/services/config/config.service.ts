import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { GenericConfig } from 'src/app/shared/models/generic-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  urlApiBack: string = '';

  genericConfig: GenericConfig = {} as GenericConfig;

  constructor(@Inject(DOCUMENT) private document: Document, private httpClient: HttpClient) {
    console.log('serviceConfig');
    let myWindow = window as any;
    this.urlApiBack =  myWindow.location.protocol + '//' + myWindow.location.hostname +':8081/edatos-srm-visualizer/api/configuration/' ;
  }

  getConfig(): GenericConfig {
    return this.genericConfig;
  }

   getUrlFooter(): Observable<string> {
    return this.httpClient.get(this.urlApiBack.concat('footer-url'), { responseType: 'text'})
    .pipe(map( result => {return result}));
  }

  getUrlHeader(): Observable<string> {
    return this.httpClient.get(this.urlApiBack.concat('header-url'), { responseType: 'text'})
    .pipe(map( result => {return result}));
  }
}
