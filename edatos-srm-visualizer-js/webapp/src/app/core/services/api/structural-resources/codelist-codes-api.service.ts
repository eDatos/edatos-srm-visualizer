import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CodelistCodesApiService extends ApiService {
    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
        this.apiSearchDataPath = 'code';
        this.apiSearchUrl = '/v1.0/codelists/~all/~all/~latest/codes';
        this.apiDetailUrl = '/v1.0/codelists/{agencyID}/{resourceID}/{version}/codes/{id}';
        this.apiChildrensUrl = '/api/codelists/{urn}/codes';
        this.apiChildrensTreeUrl = '/api/codelists/{urn}/codes';
        this.apiChildrensDataPath = '';
    }
}
