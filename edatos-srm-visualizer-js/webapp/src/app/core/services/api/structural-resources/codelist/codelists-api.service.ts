import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';
import { LocaleService } from 'src/app/core/services/locale.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode, treeNodeWithMaintainerAndScheme } from 'src/app/shared/models/tree/tree-node';
import { Resource } from 'src/app/shared/models/resources/resource.model';

@Injectable({
    providedIn: 'root'
})
export class CodelistsApiService extends ApiSrmService {

    public isRecommended: boolean = false;
    private apiRelatedCodelistUrl: string = '/v1.0/codelists/?query=VARIABLE_URN%20EQ%20%27{variableUrn}%27';
    private apiRecommendedSearchUrl: string = '/v1.0/codelists/?query=IS_RECOMMENDED%20EQ%20%27true%27&LATEST%20EQ%20%27true%27';
    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'codelist';
        this.apiSearchUrl = '/v1.0/codelists/?query=LATEST%20EQ%20%27TRUE%27';
        this.apiDetailUrl = '/v1.0/codelists/{agencyID}/{resourceID}/{version}';
        this.apiDetailForFileUrl = '/v1.0/codelists/{agencyID}/{resourceID}/{version}/codes';
        this.apiChildrenUrl = '/api/codelists/codelists/{urn}/codes';
        this.apiChildrenTreeUrl = '/api/codelists/codelists/{urn}/codes';
        this.apiChildrenDataPath = '';
        this.apiAllVersionsFromResourceUrl = '/api/codelists/{urn}/all-versions';
        this.apiSchemeUrl = '/v1.0/codelists/{agencyID}/{resourceID}/{version}'
    }

    public setApiSearchUrl(): void {
        const latestQuery = this.isLatestVersion ? '?query=LATEST%20EQ%20%27true%27' : '';
        const recommendedQuery = this.isRecommended ? 'IS_RECOMMENDED%20EQ%20%27true%27' : '';
        const latestRecommendedQuery = this.isLatestVersion && this.isRecommended ? ' AND ' : '';
        const notLatestRecommendedQuery =  !this.isLatestVersion && this.isRecommended ? '?query=' : '';
        this.apiSearchUrl = `/v1.0/codelists/${latestQuery}${latestRecommendedQuery}${notLatestRecommendedQuery}${recommendedQuery}`;
    }


    public getRelatedCodelist(variableUrn: string): Observable<any> {
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiRelatedCodelistUrl.replace('{variableUrn}', variableUrn)));
    }

    public getDataDetailCodelistResourceFromSrm(dataDetail: any, translateService: TranslateService, isDetail: boolean): Observable<CodelistResource> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(dataDetail));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
                maintainer: this.httpClient.get<any>(urlMaintainer)
            }
        ).pipe(
            map(({ data, maintainer }) => {
                    return CodelistResource.codelistResource(data, maintainer, this.localeService, translateService, isDetail);
                }
            ));
    }

    public findAllRelatedCodelistDetailsFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailRelatedCodelistWithMaintainerAndSchemeFromSrm(resource, isLatestVersion))
        );
    }

    public getDetailRelatedCodelistWithMaintainerAndSchemeFromSrm(resource: any, isLatestVersion: boolean): Observable<TreeNode> {
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(new Resource(resource.urn)));
        const urlScheme = ApiSrmService.apiStructuralResource.concat(this.getApiSchemeUrl(new Resource(resource.urn)));

        return forkJoin(
            {
                maintainer: this.httpClient.get<any>(urlMaintainer),
                scheme: this.httpClient.get<any>(urlScheme)
            }
        ).pipe(
            map(({ maintainer, scheme }) => {
                    return treeNodeWithMaintainerAndScheme(maintainer, scheme, resource, isLatestVersion, this.localeService);
                }
            ));
    }

}
