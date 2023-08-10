import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
    providedIn: 'root',
})
export class CodelistFamiliesApiService extends ApiSrmService {

    public apiFamilyCodelistUrl: string = '/v1.0/codelist/?query=CODELIST_FAMILY_URN%20EQ%20%27{variableUrn}%27';
    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
        this.apiSearchDataPath = 'codelistFamily';
        this.apiSearchUrl = '/v1.0/codelistfamilies/';
        this.apiDetailUrl = '/v1.0/codelistfamilies/{id}/';
    }

    public getApiSearchUrl(): string {
        return this.apiSearchUrl;
    }
    public loadFamilyCodelist(variableUrn: string): Observable<any> {
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiFamilyCodelistUrl.replace('{variableUrn}', variableUrn)));
    }
}
