import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';

@Injectable({
    providedIn: 'root',
})
export class ConceptsSchemeApiService extends ApiService {

    private apiConceptsOfSchemeUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts';
    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
        this.apiSearchDataPath = 'conceptScheme';
        this.apiSearchUrl = '/v1.0/conceptschemes/?query=LATEST%20EQ%20%27true%27';
        this.apiDetailUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/';
        this.apiChildrenUrl = '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}';
        this.apiChildrenTreeUrl = '/api/concepts/schemes/{urn}/concepts';
        this.apiChildrenDataPath = 'concept';
        this.apiAllVersionsFromResourceUrl = '/api/concepts/{urn}/all-versions';
    }

    public loadConceptsOfScheme(resource: ConceptResource): Observable<any> {
        let api = this.apiConceptsOfSchemeUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
            .replace('{id}', resource.id);
        return this.getData(ApiService.apiStructuralResource.concat(api));
    }
}
