import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { CodelistResource } from '../../../../../shared/models/resources/codelist-resource.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ConceptsApiService extends ApiService {

  public apiOtherConceptsUrl  = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts?fields=%2Bdescription';

  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchDataPath = 'concept';
    this.apiSearchUrl = '/v1.0/conceptschemes/~all/~all/~latest/concepts/';
    this.apiDetailUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts/{id}';
    this.apiChildrenUrl = '/api/concepts/{urn}/concepts';
    this.apiChildrenTreeUrl = '/api/concepts/{urn}/concepts';
    this.apiChildrenDataPath = '';
  }

  public loadOtherConcepts(resource: CodelistResource): Observable<any> {
    let api = this.apiOtherConceptsUrl
        .replace('{agencyID}', resource.agency)
        .replace('{resourceID}', resource.resourceId)
        .replace('{version}', resource.version)
    return this.getData(ApiService.apiStructuralResource.concat(api));
  }
}
