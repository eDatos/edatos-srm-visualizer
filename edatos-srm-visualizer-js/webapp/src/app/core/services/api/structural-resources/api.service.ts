import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { ConfigService } from '../../config/config.service';

@Injectable({
    providedIn: 'root',
})
export abstract class ApiService {
    public static apiStructuralResource: string = '';
    public static apiInternalDomain: string = '';
    public static apiSdmx: string = '';

    apiSearchDataPath: string = '';
    apiSearchUrl: string = '';

    apiDetailUrl: string = '';

    apiChildrensTreeUrl: string = '';
    apiChildrensUrl: string = '';
    apiChildrensDataPath: string = '';

    ALL_ELEMENTS: string = '~all';

    constructor(protected httpClient: HttpClient, protected config: ConfigService) {}

    loadConfiguration() {
        this.config.getApiStructuralResources().subscribe((url) => {
            ApiService.apiStructuralResource = url;
        });
        this.config.getApiSdmx().subscribe((url) => {
            ApiService.apiSdmx = url;
        });

        ApiService.apiInternalDomain = this.config.getDomainInternal();
    }

    getFile(): Observable<Blob> {
        return this.httpClient.get(ApiService.apiSdmx, { responseType: 'blob' });
    }

    getDetailFromStructureResource(resource: Resource): Observable<any> {
        let api = this.apiDetailUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
            .replace('{id}', resource.id);
        return this.getDataFromStructureResource(api);
    }

    getChildrensTree(dataDetail: Resource): Observable<any> {
        return this.getData(ApiService.apiInternalDomain.concat(this.apiChildrensTreeUrl.replace('{urn}', dataDetail!.urn)));
    }

    getSearchFromForms(searchConfig: SearchConfig, form?: FormGroup): Observable<any> {
        let query = this.buildQueryFromForm(form);
        return this.getData(ApiService.apiStructuralResource.concat(this.apiSearchUrl), query);
    }

    getSearch(searchConfig?: SearchConfig, query?: string): Observable<any> {
        if (searchConfig) {
            return this.getDataWithOffset(ApiService.apiStructuralResource.concat(this.apiSearchUrl), searchConfig, query);
        }
        return this.getData(ApiService.apiStructuralResource.concat(this.apiSearchUrl), query);
    }

    private getDataFromStructureResource(api: string, searchConfig?: SearchConfig, query?: string): Observable<any> {
        if (searchConfig) {
            return this.getDataWithOffset(ApiService.apiStructuralResource.concat(api), searchConfig, query);
        }
        return this.getData(ApiService.apiStructuralResource.concat(api), query);
    }

    private getData(url: string, query?: string): Observable<any> {
        if (query) {
            url = url.concat(encodeURIComponent(this.buildUrlOfQuery(url, query)));
            this.httpClient.get<any>(url);
        }
        return this.httpClient.get<any>(url);
    }

    private getDataWithOffset(url: string, searchConfig: SearchConfig, query?: string): Observable<any> {
        if (query) {
            return this.httpClient.get<any>(url.concat(this.getResultLimit(url, searchConfig)).concat(encodeURIComponent(query)));
        }
        return this.httpClient.get<any>(url.concat(this.getResultLimit(url, searchConfig)));
    }

    private buildUrlOfQuery(url: string, query: string): string {
        let beginParamurl = url.includes('?') ? ' AND ' : '?query=';
        return beginParamurl.concat(query);
    }

    private buildQueryFromForm(form?: FormGroup): string {
        let query = '';
        let and = '';
        if (form) {
            for (const element in form.controls) {
                if (form.get(element)?.value) {
                    query = query.concat(and.concat(element + ' ilike "' + form.get(element)?.value + '"'));
                    and = ' AND ';
                }
            }
        }
        return query;
    }

    private getResultLimit(url: string, searchConfig: SearchConfig): string {
        let beginParamurl = url.includes('?') ? '&' : '?';
        return beginParamurl + 'limit=' + searchConfig.resultLimit + '&offset=' + searchConfig.resultOffset;
    }
}
