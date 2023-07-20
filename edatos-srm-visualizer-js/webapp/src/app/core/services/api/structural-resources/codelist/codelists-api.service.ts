import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class CodelistsApiService extends ApiService {

    public apiRelatedCodelistUrl: string = '/v1.0/codelists/?query=VARIABLE_URN%20ILIKE%20%27{variableUrn}%27';
    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
        this.apiSearchDataPath = 'codelist';
        this.apiSearchUrl = '/v1.0/codelists/';
        this.apiDetailUrl = '/v1.0/codelists/{agencyID}/{resourceID}/{version}';
        this.apiChildrenUrl = '/api/codelists/{urn}/codes';
        this.apiChildrenTreeUrl = '/api/codelists/codelists/{urn}/codes';
        this.apiChildrenDataPath = '';
        this.apiAllVersionsFromResourceUrl = '/api/codelists/{urn}/all-versions';
    }

    public loadRelatedCodelist(variableUrn: string): Observable<any> {
        return this.getData(ApiService.apiStructuralResource.concat(this.apiRelatedCodelistUrl.replace('{variableUrn}', variableUrn)));
    }
}
