import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptsSchemeApiService extends ApiService{
  apiSDMXConceptsScheme = '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}';
  
  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
  }
}
