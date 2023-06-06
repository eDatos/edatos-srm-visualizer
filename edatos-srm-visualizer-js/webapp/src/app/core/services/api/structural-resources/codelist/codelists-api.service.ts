import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';

@Injectable({
    providedIn: 'root'
})
export class CodelistsApiService extends ApiService {
    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
        this.apiSearchDataPath = 'codelist';
        this.apiSearchUrl = '/v1.0/codelists/';
        this.apiDetailUrl = '/v1.0/codelists/{agencyID}/{resourceID}/{version}';
    }
}
