import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ConceptsApiService extends ApiSrmService {

  public apiOtherConceptsUrl  = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts?query=CONCEPT_SCHEME_LATEST%20EQ%20%27true%27&fields=%2Bdescription';
  public apiRecommendedCodelistUrl: string = '/v1.0/codelists/?query=VARIABLE_URN%20EQ%20%27{variableUrn}%27AND%20LATEST%20EQ%20%27true%27&fields=%2Bdescription';
  public apiCodelistDataPath = 'codelist';
  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
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
      return this.apiSearchUrl = this.apiSearchUrl.concat('?query=CONCEPT_SCHEME_LATEST%20EQ%20%27true%27')
    }
    return this.apiSearchUrl = '/v1.0/conceptschemes/~all/~all/~latest/concepts/';
  }

  public getOtherConcepts(resource: CodelistResource): Observable<any> {
    let api = this.apiOtherConceptsUrl
        .replace('{agencyID}', resource.agency)
        .replace('{resourceID}', resource.resourceId)
        .replace('{version}', resource.version);
    return this.getData(ApiSrmService.apiStructuralResource.concat(api));
  }

  public getRecommendedCodelists(variableUrn: string): Observable<any> {
    return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiRecommendedCodelistUrl.replace('{variableUrn}', variableUrn)));
  }
}
