import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService extends ApiService{
  
  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchUrl = '/v1.0/categoryschemes/~all/~all/~latest/categories';
    this.apiDetailUrl = '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}/categories/{id}';
  }





}
