import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptsApiService extends ApiService {
  

  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchDataPath = 'concept';
    this.apiSearchUrl = '/v1.0/conceptschemes/~all/~all/~latest/concepts/';
    this.apiDetailUrl = '/v1.0/conceptschemes/{agencyID}/{resourceID}/{version}/concepts/{id}';
    this.apiChildrensUrl = '/api/conceptschemes/{urn}/concepts';
    this.apiChildrensTreeUrl = '/api/conceptschemes/{urn}/concepts';
    this.apiChildrensDataPath = '';
  }
}
