import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { ApiService } from 'src/app/core/services/api/api.service';
import { BuildQueryHelper } from 'src/app/core/services/helper/build-query-helper';

@Injectable({
    providedIn: 'root'
})
export abstract class ApiSrmService extends ApiService {
    public apiSearchDataPath: string = '';
    public apiSearchUrl: string = '';

    public apiDetailUrl: string = '';
    public apiAllVersionsFromResourceUrl: string = '';

    public apiChildrenTreeUrl: string = '';
    public apiChildrenUrl: string = '';
    public apiChildrenDataPath: string = '';

    private apiManteinerUrl: string = '/v1.0/agencyschemes/SDMX/AGENCIES/~latest/agencies/{organisationID}';
    public apiSchemeUrl: string = '';


    protected buildQueryHelper: BuildQueryHelper = new BuildQueryHelper();

    /* Detail */
    public getDetailFromSrm(resource: Resource): Observable<any> {
        let api = this.apiDetailUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
            .replace('{id}', resource.id);
        return this.getDataFromSrm(api);
    }

    public getDetailManteinerFromSrm(agency: string): Observable<any> {
        let api = this.apiManteinerUrl
            .replace('{organisationID}', agency);
        return this.getDataFromSrm(api);
    }

    public getDetailSchemeFromSrm(resource: Resource): Observable<any> {
        let api = this.apiSchemeUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
        return this.getDataFromSrm(api);
    }

    public getAllVersionsFromResource(dataDetail: Resource): Observable<any> {
        return this.getData(ApiSrmService.apiInternalDomain.concat(this.apiAllVersionsFromResourceUrl.replace('{urn}', dataDetail!.urn)));
    }

    /* Children */
    public getChildrenTree(dataDetail: Resource): Observable<any> {
        return this.getData(ApiSrmService.apiInternalDomain.concat(this.apiChildrenTreeUrl.replace('{urn}', dataDetail!.urn)));
    }

    /* Search */
    public getSearchFromForms(searchConfig: SearchConfig, form?: FormGroup): Observable<any> {
        let query = this.buildQueryHelper.buildQueryFromForm(form);
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiSearchUrl), query);
    }

    public getSearch(searchConfig?: SearchConfig, query?: string): Observable<any> {
        if (searchConfig) {
            return this.getDataWithOffset(ApiSrmService.apiStructuralResource.concat(this.apiSearchUrl), searchConfig, query);
        }
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiSearchUrl), query);
    }

    /* Data */
    private getDataWithOffset(url: string, searchConfig: SearchConfig, query?: string): Observable<any> {
        if (query) {
            url = url.concat(this.buildQueryHelper.getResultLimit(url, searchConfig)).concat('&query=' + encodeURIComponent(query));
            return this.httpClient.get<any>(url);
        }
        return this.httpClient.get<any>(url.concat(this.buildQueryHelper.getResultLimit(url, searchConfig)));
    }

    protected getDataFromSrm(api: string, searchConfig?: SearchConfig, query?: string): Observable<any> {
        if (searchConfig) {
            return this.getDataWithOffset(ApiSrmService.apiStructuralResource.concat(api), searchConfig, query);
        }
        return this.getData(ApiSrmService.apiStructuralResource.concat(api), query);
    }

    protected getData(url: string, query?: string): Observable<any> {
        if (query) {
            url = this.buildQueryHelper.buildQueryUrl(url, query);
        }
        return this.httpClient.get<any>(url);
    }

}
