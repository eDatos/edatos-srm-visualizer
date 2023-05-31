import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class DsdApiService extends ApiService {
    constructor(httpClient: HttpClient, config: ConfigService) {
        super(httpClient, config);
        this.apiSearchDataPath = 'dataStructure';
        this.apiSearchUrl = '/v1.0/datastructures/?query=LATEST%20EQ%20%27true%27';
        this.apiDetailUrl = '/v1.0/datastructures/{agencyID}/{resourceID}/{version}';
    }
}
