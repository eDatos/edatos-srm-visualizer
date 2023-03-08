import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsApiService extends ApiService{


  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchUrl = '/v1.0/organisationschemes/~all/~all/~latest/organisations';
    this.apiDetailUrl = '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}/organisations/{id}';
  }
}
