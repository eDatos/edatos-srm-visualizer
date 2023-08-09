import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from '../../../locale.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsApiService extends ApiSrmService{
   constructor( httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
    super(httpClient, config, localeService);
    this.apiSearchDataPath = 'organisation';
    this.apiSearchUrl = '/v1.0/organisationschemes/~all/~all/~latest/organisations/?query=ORGANISATION_SCHEME_LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}/organisations/{id}';
    this.apiChildrenUrl = '/api/organisations/{urn}/organisations';
    this.apiChildrenTreeUrl = '/api/organisations/{urn}/organisations';
    this.apiChildrenDataPath = '';
    this.apiSchemeUrl = '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}';
  }

  public getApiSearchUrl(): string {
    if (this.isLatestVersion) {
      return this.apiSearchUrl = this.apiSearchUrl.concat('?query=ORGANISATION_SCHEME_LATEST%20EQ%20%27true%27')
    }
    return this.apiSearchUrl = '/v1.0/organisationschemes/~all/~all/~latest/organisations/';
  }
}
