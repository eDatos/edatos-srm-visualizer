import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { LocaleService } from 'src/app/core/services/locale.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { TreeNode, treeNodeWithMaintainerAndScheme } from 'src/app/shared/models/tree/tree-node';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';

@Injectable({
    providedIn: 'root'
})
export class ConceptsSchemeApiService extends ApiSrmService {

    private apiConceptsOfSchemeUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CONCEPTS_BY_CONCEPT_SCHEME_API_URL}?fields=%2Bdescription`;//'/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts/?query=CONCEPT_SCHEME_LATEST%20EQ%20%27true%27&fields=%2Bdescription';

    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'conceptScheme';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}conceptschemes/${ApiSrmUrlConstants.LATEST_QUERY}`;//'/v1.0/conceptschemes/?query=LATEST%20EQ%20%27true%27';
        this.apiDetailUrl =  '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/';
        this.apiDetailForFileUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CONCEPTS_BY_CONCEPT_SCHEME_API_URL}`;//'/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts';
        this.apiChildrenTreeUrl = `${ApiSrmUrlConstants.CONCEPTS_API_URL}`;//'/api/concepts/schemes/{urn}/concepts';
        this.apiChildrenDataPath = 'concept';
        this.apiAllVersionsFromResourceUrl = `${ApiSrmUrlConstants.CONCEPTS_ALL_VERSIONS_API_URL}`;//'/api/concepts/{urn}/all-versions';
        this.apiSchemeUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CONCEPT_SCHEME_API_URL}`;//'/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}';
    }

    public setApiSearchUrl(): void {
        const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.LATEST_QUERY : '';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}conceptschemes/${latestQuery}`;
    }

    public loadConceptsOfScheme(resource: ConceptResource): Observable<any> {

        const api = this.apiConceptsOfSchemeUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
            .replace('{id}', resource.id);
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
    }

    public getDataDetailConceptResourceFromSrm(dataDetail: any): Observable<ConceptResource> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(dataDetail));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
                maintainer: this.httpClient.get<any>(urlMaintainer)
            }
        ).pipe(
            map(({ data, maintainer }) => {
                    return ConceptResource.conceptResource(data, maintainer, this.localeService);
                }
            ));
    }

    public findAllConceptsResourcesDetailsWithMaintainerAndSchemeFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailConceptsOfSchemeWithMaintainerAndSchemeFromSrm(resource, isLatestVersion))
        );
    }

    public getDetailConceptsOfSchemeWithMaintainerAndSchemeFromSrm(resource: any, isLatestVersion: boolean): Observable<TreeNode> {
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
