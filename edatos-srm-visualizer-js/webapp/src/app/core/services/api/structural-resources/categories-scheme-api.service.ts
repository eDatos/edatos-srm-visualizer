import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesSchemeApiService extends ApiService {

  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchUrl = '/v1.0/categoryschemes/?query=LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}';
  }
}