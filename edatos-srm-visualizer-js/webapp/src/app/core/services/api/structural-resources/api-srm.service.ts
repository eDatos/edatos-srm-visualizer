import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { ApiService } from 'src/app/core/services/api/api.service';
import { BuildQueryHelper } from 'src/app/core/services/helper/build-query-helper';
import { map } from 'rxjs/internal/operators/map';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';

@Injectable({
    providedIn: 'root'
})
export abstract class ApiSrmService extends ApiService {
    public apiSearchDataPath: string = '';
    public apiSearchUrl: string = '';

    public apiAllVersionsFromResourceUrl: string = '';

    public apiChildrenTreeUrl: string = '';
    public apiChildrenUrl: string = '';
    public apiChildrenDataPath: string = '';

    public isLatestVersion: boolean = true;
    protected buildQueryHelper: BuildQueryHelper = new BuildQueryHelper();

    public getJSONFile(resource: Resource): Observable<any> {
        return this.httpClient.get(ApiService.apiStructuralResource.concat(this.getApiDetailForFileUrl(resource)).concat('.json'),
            { responseType: 'blob' });
    }

    public getCSVFile(resource: Resource): Observable<any> {
        return this.httpClient.get(ApiService.apiStructuralResource.concat(this.getApiDetailForFileUrl(resource)).concat('.csv'), { responseType: 'blob' });
    }

    public getXLSFile(resource: Resource): Observable<any> {
        return this.httpClient.get(ApiService.apiStructuralResource.concat(this.getApiDetailForFileUrl(resource)).concat('.xls'), { responseType: 'blob' });
    }

    /* Detail */
    public getDetailFromSrm(resource: Resource): Observable<any> {
        return this.getDataFromSrm(this.getApiDetailUrl(resource));
    }

    public findAllDetailsFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
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
                    const treeNode: TreeNode = {
                        name: this.localeService.getTextValue(data.name.text),
                        id: data.id ,
                        urn: data.urn,
                        description: this.localeService.getTextValue(data.description?.text),
                        selfLink: data.selfLink.href,
                        maintainer: '',
                        scheme: ''
                    };
                    return treeNode;
                }
            ));
    }

    public findAllDetailsWithMaintainerFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailWithMaintainerFromSrm(resource, isLatestVersion))
        );
    }
    public getDetailWithMaintainerFromSrm(resource: Resource, isLatestVersion: boolean): Observable<TreeNode> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(resource));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(resource));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
                maintainer: this.httpClient.get<any>(urlMaintainer),
            }
        ).pipe(
            map(({data, maintainer}) => {
                    const maintainerName = this.localeService.getTextValue(maintainer.name.text);

                    const treeNode: TreeNode = {
                        name: this.localeService.getTextValue(data.name.text),
                        id: isLatestVersion ? data.id : `${data.id}(${data.version})`,
                        urn: data.urn,
                        description: this.localeService.getTextValue(data.description?.text),
                        selfLink: data.selfLink.href,
                        maintainer: `${maintainer.id} - ${maintainerName}`,
                        scheme: ''
                    };
                    return treeNode;
                }
            ));
    }

    public findAllDetailsWithMaintainerAndSchemeFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailWithMaintainerAndSchemeFromSrm(resource, isLatestVersion))
        );
    }
    public getDetailWithMaintainerAndSchemeFromSrm(resource: Resource, isLatestVersion: boolean): Observable<TreeNode> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(resource));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(resource));
        const urlScheme = ApiSrmService.apiStructuralResource.concat(this.getApiSchemeUrl(resource));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
                maintainer: this.httpClient.get<any>(urlMaintainer),
                scheme: this.httpClient.get<any>(urlScheme)
            }
        ).pipe(
            map(({data, maintainer, scheme}) => {
                    const maintainerName = this.localeService.getTextValue(maintainer.name.text);
                    const schemeName = this.localeService.getTextValue(scheme.name.text);

                    const treeNode: TreeNode = {
                        name: this.localeService.getTextValue(data.name.text),
                        id: data.id,
                        urn: data.urn,
                        description: this.localeService.getTextValue(data.description?.text),
                        selfLink: data.selfLink.href,
                        maintainer: `${maintainer.id} - ${maintainerName}`,
                        scheme: isLatestVersion ? `${scheme.id} - ${schemeName}` : `${scheme.id}(${scheme.version}) - ${schemeName}`
                    };
                    return treeNode;
                }
            ));
    }

    public getDetailManteinerFromSrm(agency: string): Observable<any> {
        let api = this.apiManteinerUrl
            .replace('{organisationID}', agency);
        return this.getDataFromSrm(api);
    }

    public getDetailSchemeFromSrm(resource: Resource): Observable<any> {
        return this.getDataFromSrm(this.getApiSchemeUrl(resource));
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

    abstract getApiSearchUrl(): string;
}
