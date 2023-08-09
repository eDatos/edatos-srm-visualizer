import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSdmxService } from '../api-sdmx.service';

@Injectable({
  providedIn: 'root'
})
  export class ConceptsSchemeApiSdmxService extends ApiSdmxService {

  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSDMXUrl = '/v2.1/conceptscheme/{agencyID}/{resourceID}/{version}';
  }
}
