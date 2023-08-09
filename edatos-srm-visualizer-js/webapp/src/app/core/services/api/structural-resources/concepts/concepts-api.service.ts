import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { Observable } from 'rxjs/internal/Observable';
import { LocaleService } from '../../../locale.service';
import { Resource } from '../../../../../shared/models/resources/resource.model';
import { TreeNode } from '../../../../../shared/models/tree/tree-node';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
    providedIn: 'root'
})
export class ConceptsApiService extends ApiSrmService {

    public apiOtherConceptsUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts?query=CONCEPT_SCHEME_LATEST%20EQ%20%27true%27&fields=%2Bdescription';
    public apiRecommendedCodelistUrl: string = '/v1.0/codelists/?query=VARIABLE_URN%20EQ%20%27{variableUrn}%27AND%20LATEST%20EQ%20%27true%27&fields=%2Bdescription';
    public apiCodelistDataPath = 'codelist';

    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'concept';
        this.apiSearchUrl = '/v1.0/conceptschemes/~all/~all/~latest/concepts/?query=CONCEPT_SCHEME_LATEST%20EQ%20%27true%27';
        this.apiDetailUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts/{id}';
        this.apiChildrenUrl = '/api/concepts/{urn}/concepts';
        this.apiChildrenTreeUrl = '/api/concepts/{urn}/concepts';
        this.apiSchemeUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}';
        this.apiChildrenDataPath = '';
    }

    public getApiSearchUrl(): string {
        if (this.isLatestVersion) {
            return this.apiSearchUrl = this.apiSearchUrl.concat('?query=CONCEPT_SCHEME_LATEST%20EQ%20%27true%27');
        }
        return this.apiSearchUrl = '/v1.0/conceptschemes/~all/~all/~latest/concepts/';
    }

    public getApiOtherConceptsUrl(resource: Resource): string {
        const api = this.apiOtherConceptsUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version);
        return api;
    }

    public getOtherConcepts(resource: Resource): Observable<any> {
        const api = this.getApiOtherConceptsUrl(resource);
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
    }

    public findAllOtherConceptsDetailsFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailOtherConceptsWithMaintainerAndSchemeFromSrm(resource, isLatestVersion))
        );
    }

    public getDetailOtherConceptsWithMaintainerAndSchemeFromSrm(resource: any, isLatestVersion: boolean): Observable<TreeNode> {
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(new Resource(resource.urn)));
        const urlScheme = ApiSrmService.apiStructuralResource.concat(this.getApiSchemeUrl(new Resource(resource.urn)));
        return forkJoin(
            {
                maintainer: this.httpClient.get<any>(urlMaintainer),
                scheme: this.httpClient.get<any>(urlScheme)
            }
        ).pipe(
            map(({ maintainer, scheme }) => {
                    const maintainerName = this.localeService.getTextValue(maintainer.name.text);
                    const schemeName = this.localeService.getTextValue(scheme.name.text);
                    const name = this.localeService.getTextValue(resource.name?.text);

                    const treeNode: TreeNode = {
                        name: name,
                        id: resource.id,
                        urn: resource.urn,
                        description: this.localeService.getTextValue(resource.description?.text),
                        selfLink: resource.selfLink.href,
                        maintainer: `${maintainer.id} - ${maintainerName}`,
                        scheme: isLatestVersion ? `${scheme.id} - ${schemeName}` : `${scheme.id}(${scheme.version}) - ${schemeName}`
                    };
                    return treeNode;
                }
            ));
    }

    public getRecommendedCodelists(variableUrn: string): Observable<any> {
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiRecommendedCodelistUrl.replace('{variableUrn}', variableUrn)));
    }

    public findAllRecommendedCodelistsDetailsFromSrm(resources: any[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailRecommendedCodelistsFromSrm(resource, isLatestVersion))
        );
    }
    private getDetailRecommendedCodelistsFromSrm(resource: any, isLatestVersion: boolean): Observable<TreeNode> {
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(new Resource(resource.urn)));
        return this.httpClient.get<any>(urlMaintainer).pipe(
            map((maintainer ) => {
                    const maintainerName = this.localeService.getTextValue(maintainer.name.text);

                    const treeNode: TreeNode = {
                        name: this.localeService.getTextValue(resource.name.text),
                        id: resource.id,
                        urn: resource.urn,
                        description: this.localeService.getTextValue(resource.description?.text),
                        selfLink: resource.selfLink.href,
                        maintainer: `${maintainer.id} - ${maintainerName}`,
                        scheme: ''
                    };
                    return treeNode;
                }
            ));
    }
}
