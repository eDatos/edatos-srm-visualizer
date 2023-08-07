import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService extends ApiSrmService{
  
  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchDataPath = 'category';
    this.apiSearchUrl = '/v1.0/categoryschemes/~all/~all/~latest/categories?query=CATEGORY_SCHEME_LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}/categories/{id}';
    this.apiChildrenUrl = '/api/categories/{urn}/categories';
    this.apiChildrenTreeUrl = '/api/categories/{urn}/categories';
    this.apiChildrenDataPath = '';
    this.apiSchemeUrl = '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}';
  }

}
