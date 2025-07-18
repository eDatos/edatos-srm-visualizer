import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { LocaleService } from 'src/app/core/services/locale.service';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { TreeNode, treeNodeWithMaintainer, treeNodeWithMaintainerAndScheme } from 'src/app/shared/models/tree/tree-node';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';
import { SearchConfig } from 'src/app/shared/models/search-config';

@Injectable({
    providedIn: 'root'
})
export class ConceptsSchemeApiService extends ApiSrmService {

    private apiConceptsOfSchemeUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CONCEPTS_BY_CONCEPT_SCHEME_API_URL}?fields=+description`;

    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'conceptScheme';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}conceptschemes/${ApiSrmUrlConstants.LATEST_QUERY}`;
        this.apiDetailUrl =  '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/';
        this.apiDetailForFileUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CONCEPTS_BY_CONCEPT_SCHEME_API_URL}`;
        this.apiChildrenTreeUrl = `${ApiSrmUrlConstants.CONCEPTS_API_URL}`;
        this.apiChildrenDataPath = 'concept';
        this.apiAllVersionsFromResourceUrl = `${ApiSrmUrlConstants.CONCEPTS_ALL_VERSIONS_API_URL}`;
        this.apiSchemeUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CONCEPT_SCHEME_API_URL}`;
    }

    public setApiSearchUrl(): void {
        const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.LATEST_QUERY : '';
        const apiAgencyDataPath = this.agencyId !== '' ? `${this.agencyId}/` : this.agencyId;
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}conceptschemes/${apiAgencyDataPath}${latestQuery}`;
    }

    public loadConceptsOfScheme(resource: ConceptResource, searchConfig: SearchConfig): Observable<any> {
        const api = this.apiConceptsOfSchemeUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
            .replace('{id}', resource.id);
        return this.getDataWithOffset(ApiSrmService.apiStructuralResource.concat(api), searchConfig);
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

    public findAllConceptsResourcesDetailsWithMaintainerAndSchemeFromSrm(resources: Resource[], isLatestVersion: boolean, scheme: any): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailConceptsOfSchemeWithMaintainerAndSchemeFromSrm(resource, isLatestVersion, scheme))
        );
    }

   

    public getDetailConceptsOfSchemeWithMaintainerAndSchemeFromSrm(resource: any, isLatestVersion: boolean, scheme: any): Observable<TreeNode> {
        const maintainer = new Resource(resource.urn).agency;

        return of(treeNodeWithMaintainerAndScheme(maintainer, scheme, resource, isLatestVersion, this.localeService));
    }
}
