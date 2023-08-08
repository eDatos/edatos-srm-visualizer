import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class CodelistsApiService extends ApiSrmService {

    private apiRelatedCodelistUrl: string = '/v1.0/codelists/?query=VARIABLE_URN%20EQ%20%27{variableUrn}%27&fields=%2Bdescription';
    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
        this.apiSearchDataPath = 'codelist';
        this.apiSearchUrl = '/v1.0/codelists/?query=LATEST%20EQ%20%27TRUE%27';
        this.apiDetailUrl = '/v1.0/codelists/{agencyID}/{resourceID}/{version}';
        this.apiDetailForFileUrl = '/v1.0/codelists/{agencyID}/{resourceID}/{version}/codes';
        this.apiChildrenUrl = '/api/codelists/{urn}/codes';
        this.apiChildrenTreeUrl = '/api/codelists/codelists/{urn}/codes';
        this.apiChildrenDataPath = '';
        this.apiAllVersionsFromResourceUrl = '/api/codelists/{urn}/all-versions';
    }

    public getApiSearchUrl(): string {
        if (this.isLatestVersion) {
            return this.apiSearchUrl = this.apiSearchUrl.concat('?query=LATEST%20EQ%20%27true%27')
        }
        return this.apiSearchUrl = '/v1.0/codelists/';
    }

    public getRelatedCodelist(variableUrn: string): Observable<any> {
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiRelatedCodelistUrl.replace('{variableUrn}', variableUrn)));
    }
}
