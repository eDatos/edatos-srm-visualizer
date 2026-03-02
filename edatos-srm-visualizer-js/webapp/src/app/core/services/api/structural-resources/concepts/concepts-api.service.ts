import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import {Constants} from "../../../../../shared/models/constants";
import {
    TreeNode,
    treeNodeWithMaintainer,
    treeNodeWithMaintainerAndScheme
} from 'src/app/shared/models/tree/tree-node';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';
import { SearchConfig } from 'src/app/shared/models/search-config';

@Injectable({
    providedIn: 'root'
})
export class ConceptsApiService extends ApiSrmService {

    public apiOtherConceptsUrl =  `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CONCEPTS_BY_CONCEPT_SCHEME_API_URL}${ApiSrmUrlConstants.OTHER_CONCEPT_SCHEME_LATEST}`;
    public apiRecommendedCodelistUrl: string = `${ApiSrmUrlConstants.API_SRM_VERSION}codelists/${ApiSrmUrlConstants.VARIABLE_URN_QUERY}`;
    public apiCodelistDataPath = 'codelist';

    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'concept';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ALL_CONCEPTS_SCHEMES_API_URL}${ApiSrmUrlConstants.CONCEPT_SCHEME_LATEST_QUERY}`;
        this.apiDetailUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CONCEPT_BY_CONCEPTS_SCHEME_API_URL}`;
        this.apiChildrenTreeUrl = `${ApiSrmUrlConstants.CONCEPTS_API_URL}`;
        this.apiSchemeUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CONCEPT_SCHEME_API_URL}`;
        this.apiChildrenDataPath = '';
    }

    public setApiSearchUrl(): void {
        const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.CONCEPT_SCHEME_LATEST_QUERY : '';
        const agencyId = this.agencyId || Constants.ALL

        let baseUrl = ApiSrmUrlConstants.CONCEPTS_BY_CONCEPT_SCHEME_API_URL
            .replace('{agencyID}', agencyId)
            .replace('{resourceID}', Constants.ALL)
            .replace('{version}', Constants.ALL);

        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${baseUrl}${latestQuery}`;
    }

    public getApiOtherConceptsUrl(resource: Resource): string {
        const api = this.apiOtherConceptsUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version);
        return api;
    }

    public getDataDetailConceptResourceFromSrm(dataDetail: any): Observable<ConceptResource> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiMaintainerUrl(dataDetail));
        const urlScheme = ApiSrmService.apiStructuralResource.concat(this.getApiSchemeUrl(dataDetail));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url, { headers: ApiSrmService.headers }),
                maintainer: this.httpClient.get<any>(urlMaintainer, { headers: ApiSrmService.headers }),
                scheme: this.httpClient.get<any>(urlScheme, { headers: ApiSrmService.headers })
            }
        ).pipe(
            map(({ data, maintainer, scheme }) => {
                    return ConceptResource.conceptResource(data, maintainer, this.localeService, scheme);
                }
            ));
    }

    public getOtherConcepts(resource: Resource, searchConfig: SearchConfig): Observable<any> {
        const api = this.getApiOtherConceptsUrl(resource);
        return this.getDataWithOffset(ApiSrmService.apiStructuralResource.concat(api), searchConfig);
    }

    public findAllOtherConceptsDetailsFromSrm(resources: Resource[], isLatestVersion: boolean, scheme: any): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailOtherConceptsWithMaintainerAndSchemeFromSrm(resource, isLatestVersion, scheme))
        );
    }

    public getDetailOtherConceptsWithMaintainerAndSchemeFromSrm(resource: any, isLatestVersion: boolean, scheme: any): Observable<TreeNode> {
        const maintainer = new Resource(resource.urn).agency;

        return of(treeNodeWithMaintainerAndScheme(maintainer, scheme, resource, isLatestVersion, this.localeService))
    }

    public getRecommendedCodelists(variableUrn: string, searchConfig: SearchConfig): Observable<any> {
        return this.getDataWithOffset(ApiSrmService.apiStructuralResource.concat(this.apiRecommendedCodelistUrl.replace('{variableUrn}', variableUrn)), searchConfig);
    }

    public findAllRecommendedCodelistsDetailsFromSrm(resources: any[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailRecommendedCodelistsFromSrm(resource, isLatestVersion))
        );
    }

    private getDetailRecommendedCodelistsFromSrm(resource: any, isLatestVersion: boolean): Observable<TreeNode> {
        const maintainer = new Resource(resource.urn).agency;
        return of(treeNodeWithMaintainer(maintainer, resource, isLatestVersion, this.localeService));
    }
}
