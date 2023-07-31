import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsApiService extends ApiService{
  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchDataPath = 'organisation';
    this.apiSearchUrl = '/v1.0/organisationschemes/~all/~all/~latest/organisations';
    this.apiDetailUrl = '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}/organisations/{id}';
    this.apiChildrenUrl = '/api/organisations/{urn}/organisations';
    this.apiChildrenTreeUrl = '/api/organisations/{urn}/organisations';
    this.apiChildrenDataPath = '';
  }
}
