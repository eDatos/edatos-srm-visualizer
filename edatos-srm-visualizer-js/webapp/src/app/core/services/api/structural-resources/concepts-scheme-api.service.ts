import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptsSchemeApiService extends ApiService {

  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchDataPath = 'conceptScheme';
    this.apiSearchUrl = '/v1.0/conceptschemes/?query=LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/';
    this.apiChildrensUrl = '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}';
    this.apiChildrensTreeUrl = '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}';
    this.apiChildrensDataPath = 'concept';
  }
}
