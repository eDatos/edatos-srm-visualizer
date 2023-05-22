import { DOCUMENT, LocationStrategy, Location, HashLocationStrategy } from '@angular/common';
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
    private urlApiBackConfiguration: string = '';
    private urlFooter: string = '';
    private urlHeader: string = '';
    private urlStructuralResourcesApi: string = '';
    private languageCookie: string = '';

    private genericConfig: GenericConfig = {} as GenericConfig;

    constructor(@Inject(DOCUMENT) private document: Document, private httpClient: HttpClient, private locationStrategy: LocationStrategy) {
        this.urlApiBackConfiguration = this.getDomainInternal() + '/api/configuration/';
    }

    public getDomainInternal(): string {
        let myWindow = window as any;

        let domain = myWindow.location.hostname + ':' + myWindow.location.port;
        if (this.locationStrategy.getBaseHref().length > 1) {
            let href = this.locationStrategy.getBaseHref().split('/');

            if (href && href.length > 1) {
                domain = domain.concat('/' + href[1]).replace(/\/\//g, '/');
            } else {
                domain = domain.concat('/' + this.locationStrategy.getBaseHref()).replace(/\/\//g, '/');
            }
        }
        if (domain.endsWith('/')) {
            domain = domain.slice(0, -1);
        }
        return myWindow.location.protocol + '//' + domain;
    }

    public getApiStructuralResources(): Observable<string> {
        if (this.urlStructuralResourcesApi) {
            return of(this.urlStructuralResourcesApi);
        }
        return this.httpClient.get(this.urlApiBackConfiguration.concat('structural-resource-api'), { responseType: 'text' }).pipe(
            map((result) => {
                return result;
            })
        );
    }

    public getApiSdmx(): Observable<string> {
        if (this.urlStructuralResourcesApi) {
            return of(this.urlStructuralResourcesApi);
        }
        return this.httpClient.get(this.urlApiBackConfiguration.concat('sdmx-api'), { responseType: 'text' }).pipe(
            map((result) => {
                return result;
            })
        );
    }

    public getUrlFooter(): Observable<string> {
        if (this.urlFooter) {
            return of(this.urlFooter);
        }
        return this.httpClient.get(this.urlApiBackConfiguration.concat('footer-url'), { responseType: 'text' }).pipe(
            map((result) => {
                this.urlFooter = result;
                return this.urlFooter;
            })
        );
    }

    public getUrlHeader(): Observable<string> {
        if (this.urlHeader) {
            return of(this.urlHeader);
        }
        return this.httpClient.get(this.urlApiBackConfiguration.concat('header-url'), { responseType: 'text' }).pipe(
            map((result) => {
                this.urlHeader = result;
                return result;
            })
        );
    }

    public getLanguageCookie(): Observable<string> {
        if (this.languageCookie) {
            return of(this.languageCookie);
        }
        return this.httpClient.get(this.urlApiBackConfiguration.concat('language-cookie'), { responseType: 'text' }).pipe(
            map((result) => {
                this.languageCookie = result;
                return result;
            })
        );
    }
}
