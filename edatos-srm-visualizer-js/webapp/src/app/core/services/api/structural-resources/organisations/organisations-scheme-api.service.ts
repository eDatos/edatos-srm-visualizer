import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsSchemeApiService extends ApiSrmService {

  constructor( httpClient: HttpClient, config: ConfigService) {
    super(httpClient, config);
    this.apiSearchDataPath = 'organisationScheme';
    this.apiSearchUrl = '/v1.0/organisationschemes/?query=LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}';
    this.apiChildrenUrl = '/api/organisations/{urn}/organisations';
    this.apiChildrenTreeUrl = '/api/organisations/{urn}/organisations';

    this.apiAllVersionsFromResourceUrl = '/api/organisations/{urn}/all-versions';
  }

  public getApiSearchUrl(): string {
    if (this.isLatestVersion) {
      return this.apiSearchUrl = this.apiSearchUrl.concat('?query=LATEST%20EQ%20%27true%27')
    }
    return this.apiSearchUrl = '/v1.0/organisationschemes/';
  }
}
