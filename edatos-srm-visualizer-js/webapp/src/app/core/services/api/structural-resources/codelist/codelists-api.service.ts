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
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';
import { SearchConfig } from 'src/app/shared/models/search-config';

@Injectable({
    providedIn: 'root'
})
export class CodelistsApiService extends ApiSrmService {

    private apiRelatedCodelistUrl: string = `/v1.0/codelists/?query=VARIABLE_URN EQ '{variableUrn}'${ApiSrmUrlConstants.AND_LATEST_QUERY}`;
    //private apiRecommendedSearchUrl: string = '/v1.0/codelists/?query=IS_RECOMMENDED%20EQ%20%27true%27&LATEST%20EQ%20%27true%27';
    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'codelist';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}codelists/${ApiSrmUrlConstants.LATEST_QUERY}`;
        this.apiDetailUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CODELIST_API_URL}`;
        this.apiDetailForFileUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CODES_BY_CODELISTS_API_URL}`;
        this.apiChildrenTreeUrl = `${ApiSrmUrlConstants.CODELISTS_API_URL}`;
        this.apiAllVersionsFromResourceUrl = `${ApiSrmUrlConstants.CODELISTS_ALL_VERSIONS_API_URL}`;
        this.apiSchemeUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CODELIST_API_URL}`;
    }

    public setApiSearchUrl(agencyId?: string): void {
        const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.LATEST_QUERY : '';
        const recommendedQuery = this.isRecommended ? ApiSrmUrlConstants.CODELIST_IS_RECOMMENDED_QUERY : '';
        const latestRecommendedQuery = this.isLatestVersion && this.isRecommended ? ' AND ' : '';
        const notLatestRecommendedQuery =  !this.isLatestVersion && this.isRecommended ? '?query=' : '';
        const apiAgencyDataPath = agencyId ? `${agencyId}/` : '';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}codelists/${apiAgencyDataPath}${latestQuery}${latestRecommendedQuery}${notLatestRecommendedQuery}${recommendedQuery}`;
    }


    public getRelatedCodelist(variableUrn: string, searchConfig: SearchConfig): Observable<any> {
        return this.getDataWithOffset(ApiSrmService.apiStructuralResource.concat(this.apiRelatedCodelistUrl.replace('{variableUrn}', variableUrn)), searchConfig);
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
        const maintainer = new Resource(resource.urn).agency;
        const urlScheme = ApiSrmService.apiStructuralResource.concat(this.getApiSchemeUrl(new Resource(resource.urn)));

        return forkJoin(
            {
                scheme: this.httpClient.get<any>(urlScheme)
            }
        ).pipe(
            map(({ scheme }) => {
                    return treeNodeWithMaintainerAndScheme(maintainer, scheme, resource, isLatestVersion, this.localeService);
                }
            ));
    }

}
