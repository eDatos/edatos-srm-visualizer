import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { ConfigService } from '../../config/config.service';
import { SimpleSearchFilter } from '../../filters/simple-search-filter';

@Injectable({
    providedIn: 'root'
})
export abstract class ApiService {
    public static apiStructuralResource: string = '';
    public static apiInternalDomain: string = '';
    public static apiSdmx: string = '';

    public apiSearchDataPath: string = '';
    public apiSearchUrl: string = '';

    public apiDetailUrl: string = '';

    public apiChildrensTreeUrl: string = '';
    public apiChildrensUrl: string = '';
    public apiChildrensDataPath: string = '';

    ALL_ELEMENTS: string = '~all';

    protected simpleSearchFilter: SimpleSearchFilter = new SimpleSearchFilter();

    protected constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    }

    public loadConfiguration() {
        this.config.getApiStructuralResources().subscribe((url) => {
            ApiService.apiStructuralResource = url;
        });
        this.config.getApiSdmx().subscribe((url) => {
            ApiService.apiSdmx = url;
        });

        ApiService.apiInternalDomain = this.config.getDomainInternal();
    }

    public getFile(): Observable<Blob> {
        return this.httpClient.get(ApiService.apiSdmx, { responseType: 'blob' });
    }

    public getDetailFromStructureResource(resource: Resource): Observable<any> {
        let api = this.apiDetailUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
            .replace('{id}', resource.id);
        return this.getDataFromStructureResource(api);
    }

    public getChildrensTree(dataDetail: Resource): Observable<any> {
        return this.getData(ApiService.apiInternalDomain.concat(this.apiChildrensTreeUrl.replace('{urn}', dataDetail!.urn)));
    }

    public getSearchFromForms(searchConfig: SearchConfig, form?: FormGroup): Observable<any> {
        let query = this.buildQueryFromForm(form);
        return this.getData(ApiService.apiStructuralResource.concat(this.apiSearchUrl), query);
    }

    public getSearch(searchConfig?: SearchConfig, query?: string): Observable<any> {
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
            if(this.apiSearchUrl.includes('codelistfamilies')) {
                let text = '?query='
                url = url.concat(text.concat(encodeURIComponent(query)));
            } else {
                url = url.concat(encodeURIComponent(this.buildUrlOfQuery(url, query)));
            }
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
        if (form) {
            this.simpleSearchFilter.setValues(form.controls);
            query = this.simpleSearchFilter.getCriteria();
        }
        return query;
    }

    private getResultLimit(url: string, searchConfig: SearchConfig): string {
        let beginParamurl = url.includes('?') ? '&' : '?';
        return beginParamurl + 'limit=' + searchConfig.resultLimit + '&offset=' + searchConfig.resultOffset;
    }
}
