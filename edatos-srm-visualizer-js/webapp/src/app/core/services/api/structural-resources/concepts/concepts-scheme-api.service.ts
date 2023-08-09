import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { LocaleService } from '../../../locale.service';

@Injectable({
    providedIn: 'root',
})
export class ConceptsSchemeApiService extends ApiSrmService {

    private apiConceptsOfSchemeUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts';
    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'conceptScheme';
        this.apiSearchUrl = '/v1.0/conceptschemes/?query=LATEST%20EQ%20%27true%27';
        this.apiDetailUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/';
        this.apiDetailForFileUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts';
        this.apiChildrenUrl = '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}';
        this.apiChildrenTreeUrl = '/api/concepts/schemes/{urn}/concepts';
        this.apiChildrenDataPath = 'concept';
        this.apiAllVersionsFromResourceUrl = '/api/concepts/{urn}/all-versions';
    }

    public getApiSearchUrl(): string {
        if (this.isLatestVersion) {
            return this.apiSearchUrl = this.apiSearchUrl.concat('?query=LATEST%20EQ%20%27true%27')
        }
        return this.apiSearchUrl = '/v1.0/conceptschemes/';
    }
    public loadConceptsOfScheme(resource: ConceptResource): Observable<any> {
        const api = this.apiConceptsOfSchemeUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
            .replace('{id}', resource.id);
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
    }
}
