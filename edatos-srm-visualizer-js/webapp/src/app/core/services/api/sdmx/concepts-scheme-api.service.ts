import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ApiService } from '../structural-resources/api.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptsSchemeApiService extends ApiService{
  apiSDMXConceptsScheme = '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}';
  
  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
  }
}
