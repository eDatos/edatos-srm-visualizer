import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { LocaleService } from 'src/app/core/services/locale.service';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public static apiStructuralResource: string = '';
    public static apiInternalDomain: string = '';
    public static apiSdmx: string = '';
    public static headers: HttpHeaders =  new HttpHeaders();

    public apiMaintainersUrl: string = `/v1.0/agencyschemes/SDMX/AGENCIES/~latest/agencies`;
    public apiMaintainerUrl: string = `${this.apiMaintainersUrl}/{organisationID}`;

    public apiSDMXUrl: string = '';
    public apiDetailForFileUrl: string = '';

    public apiDetailUrl: string = '';
    public apiSchemeUrl: string = '';

    public apiAllVersionsFromResourceUrl: string = '';

    protected constructor(protected httpClient: HttpClient, protected config: ConfigService,
                          protected localeService: LocaleService) {}

    public loadConfiguration() {
        this.config.getApiStructuralResources().subscribe((url) => {
            ApiService.apiStructuralResource = url;
        });

        this.config.getApiSdmx().subscribe((url) => {
            ApiService.apiSdmx = url;
        });

        ApiService.apiInternalDomain = this.config.getDomainInternal();

        this.config.getApikey().subscribe((value: string) => {
            ApiService.headers = new HttpHeaders({'api-key': value});
        });
        
    }

    public getApiSDMXUrl(resource: Resource) {
        return this.apiSDMXUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version);
    }

    public getApiDetailUrl(resource: Resource) {
        return this.apiDetailUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
            .replace('{id}', resource.id);
    }

    public getApiDetailForFileUrl(resource: Resource) {
        return this.apiDetailForFileUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version);
    }


    public getApiSchemeUrl(resource: Resource) {
        return this.apiSchemeUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
    }

    public getApiMaintainerUrl(resource: Resource, form?: FormGroup ) {
        if (form) {
            return this.apiMaintainerUrl.replace('{organisationID}', '');
        }
        return this.apiMaintainerUrl
            .replace('{organisationID}', resource.agency);
    }

    public getApiAllVersionsFromResourceUrl(resource: Resource) {
        return this.apiAllVersionsFromResourceUrl.replace('{urn}', resource.urn)
    }

    public getApiMaintainersUrl() {
        return this.apiMaintainersUrl;
    }

}
