import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { Resource } from '../../../shared/models/resources/resource.model';
import { LocaleService } from '../locale.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public static apiStructuralResource: string = '';
    public static apiInternalDomain: string = '';
    public static apiSdmx: string = '';

    public apiManteinerUrl: string = '/v1.0/agencyschemes/SDMX/AGENCIES/~latest/agencies/{organisationID}';

    public apiSDMXUrl: string = '';
    public apiDetailForFileUrl: string = '';

    public apiDetailUrl: string = '';
    public apiSchemeUrl: string = '';

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

    public getApiManteinerUrl(resource: Resource) {
        return this.apiManteinerUrl
            .replace('{organisationID}', resource.agency);
    }

}
