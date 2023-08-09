import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';


@Injectable({
    providedIn: 'root'
})
export class CodelistCodesApiService extends ApiSrmService {

    public apiOtherCodesUrl  = '/v1.0/codelists/{agencyID}/{resourceID}/{version}/codes';

    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
        this.apiSearchDataPath = 'code';
        this.apiSearchUrl = '/v1.0/codelists/~all/~all/~latest/codes/?query=CODELIST_LATEST%20EQ%20%27TRUE%27';
        this.apiDetailUrl = '/v1.0/codelists/{agencyID}/{resourceID}/{version}/codes/{id}';
        this.apiChildrenUrl = '/api/codelists/{urn}/codes';
        this.apiChildrenTreeUrl = '/api/codelists/{urn}/codes';
        this.apiChildrenDataPath = '';
    }

    public getApiSearchUrl(): string {
        if (this.isLatestVersion) {
            return this.apiSearchUrl = this.apiSearchUrl.concat('?query=CODELIST_LATEST%20EQ%20%27true%27')
        }
        return this.apiSearchUrl = '/v1.0/codelists/~all/~all/~latest/codes/';
    }

    public loadOtherCodes(resource: CodelistResource): Observable<any> {
        let api = this.apiOtherCodesUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
            .replace('{id}', resource.id);
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
    }

}

