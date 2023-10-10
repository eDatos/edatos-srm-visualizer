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
    private urlFavicon: string = '';
    private urlStructuralResourcesApi: string = '';
    private languageCookie: string = '';

    private genericConfig: GenericConfig = {} as GenericConfig;

    constructor(@Inject(DOCUMENT) private document: Document, private httpClient: HttpClient, private locationStrategy: LocationStrategy) {
        this.urlApiBackConfiguration = this.getDomainInternal() + '/api/configuration/';
        console.log('this.urlApiBackConfiguration: ', this.urlApiBackConfiguration)
    }

    public getDomainInternal(): string {
        const myWindow = window as any;
        const baseHref = this.locationStrategy.getBaseHref();
        const protocol = myWindow.location.protocol;
        const hostname = myWindow.location.hostname;
        const port = myWindow.location.port;

        let domain = hostname + ':' + port;

        if (baseHref) {
            const trimmedBaseHref = baseHref.startsWith('/') ? baseHref.substring(1) : baseHref;
            domain = domain + '/' + trimmedBaseHref.replace(/\/\//g, '/');
        }

        if (domain.endsWith('/')) {
            domain = domain.slice(0, -1);
        }

        return protocol + '//' + domain;
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

    public getFaviconUrl(): Observable<string> {
        if (this.urlFavicon) {
            return of(this.urlFavicon);
        }
        return this.httpClient.get(this.urlApiBackConfiguration.concat('favicon-url'), { responseType: 'text' }).pipe(
            map((result) => {
                this.urlFavicon = result;
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
