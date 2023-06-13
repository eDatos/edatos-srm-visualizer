import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';

@Injectable({
    providedIn: 'root',
})
export class ConceptsSchemeApiService extends ApiService {
    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
        this.apiSearchDataPath = 'conceptScheme';
        this.apiSearchUrl = '/v1.0/conceptschemes/?query=LATEST%20EQ%20%27true%27';
        this.apiDetailUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/';
        this.apiChildrenUrl = '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}';
        this.apiChildrenTreeUrl = '/api/concepts/schemes/{urn}/concepts';
        this.apiChildrenDataPath = 'concept';
    }
}
