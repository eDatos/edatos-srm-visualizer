import { DOCUMENT, LocationStrategy, Location, HashLocationStrategy} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { GenericConfig } from 'src/app/shared/models/generic-config.model';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  urlApiBack: string = '';
  urlFooter: string = '';
  urlHeader: string = '';
  urlStructuralResourcesApi: string = '';

  genericConfig: GenericConfig = {} as GenericConfig;

  constructor(@Inject(DOCUMENT) private document: Document, private httpClient: HttpClient, private locationStrategy: LocationStrategy) {
    this.urlApiBack = (this.getDomainInternal() + 'api/configuration/')
  }

  getDomainInternal (): string {
    let myWindow = window as any;

    let domain = myWindow.location.hostname + ':' + myWindow.location.port;

    if (this.locationStrategy.getBaseHref().length > 1) {
      domain = domain.concat('/' + this.locationStrategy.getBaseHref()).replace(/\/\//g, '/');
    }
    if (!domain.endsWith('/')) {
      domain = domain.concat('/');
    }

    return  myWindow.location.protocol + '//' + domain;
  }

  getApiStructuralResources(): Observable<string> {
    if (this.urlStructuralResourcesApi) {
      return of(this.urlStructuralResourcesApi);
    }
    return this.httpClient.get(this.urlApiBack.concat('structural-resource-api'), { responseType: 'text' })
      .pipe(map(result => { 
        return result }));
  }

  getApiSdmx(): Observable<string> {
    if (this.urlStructuralResourcesApi) {
      return of(this.urlStructuralResourcesApi);
    }
    return this.httpClient.get(this.urlApiBack.concat('sdmx-api'), { responseType: 'text' })
      .pipe(map(result => { return result }));
  }

  getConfig(): GenericConfig {
    return this.genericConfig;
  }

  getUrlFooter(): Observable<string> {
    if (this.urlFooter) {
      return of(this.urlFooter);
    }
    return this.httpClient.get(this.urlApiBack.concat('footer-url'), { responseType: 'text' })
      .pipe(map(result => {
        this.urlFooter = result;
        return this.urlFooter;
      }));
  }

  getUrlHeader(): Observable<string> {
    if (this.urlHeader) {
      return of(this.urlHeader);
    }
    return this.httpClient.get(this.urlApiBack.concat('header-url'), { responseType: 'text' })
      .pipe(map(result => { return result }));
  }


}
