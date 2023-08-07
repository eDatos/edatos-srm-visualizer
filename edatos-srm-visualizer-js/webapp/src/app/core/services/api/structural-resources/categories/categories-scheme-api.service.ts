import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesSchemeApiService extends ApiSrmService {

  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchDataPath = 'categoryScheme';
    this.apiSearchUrl = '/v1.0/categoryschemes/?query=LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}';
    this.apiChildrenUrl = '/api/categories/schemes/{urn}/categories';
    this.apiChildrenTreeUrl = '/api/categories/schemes/{urn}/categories';
    this.apiChildrenDataPath = '';
    this.apiAllVersionsFromResourceUrl = '/api/categories/{urn}/all-versions';
  }

  public getApiSearchUrl(): string {
    if (this.isLatestVersion) {
      return this.apiSearchUrl = this.apiSearchUrl.concat('?query=LATEST%20EQ%20%27true%27')
    }
    return this.apiSearchUrl = '/v1.0/categoryschemes/';
  }
}
