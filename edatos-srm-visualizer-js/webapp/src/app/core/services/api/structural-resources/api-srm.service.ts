import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { ApiService } from 'src/app/core/services/api/api.service';
import { BuildQueryHelper } from 'src/app/core/services/helper/build-query-helper';
import { ApiSrmUrlConstants } from 'src/app/shared/models/api-srm-url-constants';
import { map } from 'rxjs/internal/operators/map';
import {
    treeNode,
    TreeNode,
    treeNodeWithMaintainer,
    treeNodeWithMaintainerAndScheme
} from 'src/app/shared/models/tree/tree-node';

@Injectable({
    providedIn: 'root'
})

export abstract class ApiSrmService extends ApiService {
    public apiSearchDataPath: string = '';
    public apiSearchUrl: string = '';

    public apiChildrenTreeUrl: string = '';
    public apiChildrenDataPath: string = '';

    public isLatestVersion: boolean = true;
    public isRecommended: boolean = false;
    public agencyId: string = '';
    protected buildQueryHelper: BuildQueryHelper = new BuildQueryHelper();

    public getJSONFile(resource: Resource): Observable<any> {
        return this.httpClient.get(ApiService.apiStructuralResource.concat(this.getApiDetailForFileUrl(resource)).concat('.json').concat(`?${ApiSrmUrlConstants.FIELDS_DESCRIPTION}`),
            { responseType: 'blob' });
    }

    public getCSVFile(resource: Resource): Observable<any> {
        return this.httpClient.get(ApiService.apiStructuralResource.concat(this.getApiDetailForFileUrl(resource)).concat('.csv').concat(`?${ApiSrmUrlConstants.FIELDS_DESCRIPTION}`), { responseType: 'blob' });
    }

    public getXLSXFile(resource: Resource): Observable<any> {
        return this.httpClient.get(ApiService.apiStructuralResource.concat(this.getApiDetailForFileUrl(resource)).concat('.xlsx').concat(`?${ApiSrmUrlConstants.FIELDS_DESCRIPTION}`), { responseType: 'blob' });
    }

    public getAllMaintainers(): Observable<any> {
        return this.httpClient.get(ApiService.apiStructuralResource.concat(this.getApiMaintainersUrl()));
    }

    /* Detail */
    public getDetailFromSrm(resource: Resource): Observable<any> {
        return this.getDataFromSrm(this.getApiDetailUrl(resource));
    }

    public findAllResourcesDetailsFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailsFromSrm(resource, isLatestVersion))
        );
    }
    public getDetailsFromSrm(resource: Resource, isLatestVersion: boolean): Observable<TreeNode> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(resource));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url)
            }
        ).pipe(
            map(({data}) => {
                return treeNode(data, isLatestVersion, this.localeService);
                }
            ));
    }

    public findAllResourcesDetailsWithMaintainerFromSrm(resources: Resource[], isLatestVersion: boolean, form?: FormGroup): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailWithMaintainerFromSrm(resource, isLatestVersion, form))
        );
    }
    public getDetailWithMaintainerFromSrm(resource: Resource, isLatestVersion: boolean ,form?: FormGroup): Observable<TreeNode> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(resource));
        const maintainer = new Resource(resource.urn).agency;
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
            }
        ).pipe(
            map(({data}) => {
                    return treeNodeWithMaintainer(maintainer, data, isLatestVersion, this.localeService);
                }
            ));
    }

    public findAllResourcesDetailsWithMaintainerAndSchemeFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailWithMaintainerAndSchemeFromSrm(resource, isLatestVersion))
        );
    }

    public getDetailWithMaintainerAndSchemeFromSrm(resource: Resource, isLatestVersion: boolean): Observable<TreeNode> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(resource));
        const urlScheme = ApiSrmService.apiStructuralResource.concat(this.getApiSchemeUrl(resource));
        const maintainer = new Resource(resource.urn).agency;
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
                scheme: this.httpClient.get<any>(urlScheme)
            }
        ).pipe(
            map(({data, scheme}) => {
                    return treeNodeWithMaintainerAndScheme(maintainer, scheme, data, isLatestVersion, this.localeService);
                }
            ));
    }

    public getAllVersionsFromResource(resource: Resource): Observable<any> {
        return this.getData(ApiSrmService.apiInternalDomain.concat(this.getApiAllVersionsFromResourceUrl(resource)));
    }

    /* Children */
    public getChildrenTree(dataDetail: Resource): Observable<any> {
        return this.getData(ApiSrmService.apiInternalDomain.concat(this.apiChildrenTreeUrl.replace('{urn}', dataDetail!.urn)));
    }

    /* Search */
    public getSearchFromForms(searchConfig: SearchConfig, form?: FormGroup): Observable<any> {
        let query = this.buildQueryHelper.buildQueryFromForm(form);
        if (searchConfig) {
            return this.getDataWithOffset(ApiSrmService.apiStructuralResource.concat(this.apiSearchUrl), searchConfig, query);
        } 
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiSearchUrl), query);
    }

    public getAdvancedSearchFromForms(searchConfig: SearchConfig, form: FormGroup): Observable<any> {
        let query = this.buildQueryHelper.buildAdvanceQueryFromForm(this.isLatestVersion, form);
        if (searchConfig) {
            return this.getDataWithOffset(ApiSrmService.apiStructuralResource.concat(this.apiSearchUrl), searchConfig, query);
        }
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiSearchUrl), query);
    }

    public getSearch(searchConfig?: SearchConfig, query?: string): Observable<any> {
        if (searchConfig) {
            return this.getDataWithOffset(ApiSrmService.apiStructuralResource.concat(this.apiSearchUrl), searchConfig, query);
        }

        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiSearchUrl), query);
    }

    /* Data */
    public getDataWithOffset(url: string, searchConfig: SearchConfig, query?: string): Observable<any> {
        if (query) {
            url = this.buildQueryHelper.buildQueryUrl(url, query, this.isLatestVersion);
        }
        url = url.replace('{query}','');
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
            url = this.buildQueryHelper.buildQueryUrl(url, query, this.isLatestVersion);
        }
        return this.httpClient.get<any>(url);
    }

    abstract setApiSearchUrl(): void;
}
