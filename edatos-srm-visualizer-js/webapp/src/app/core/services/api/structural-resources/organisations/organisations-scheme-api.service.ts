import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Observable } from 'rxjs/internal/Observable';
import { OrganisationResource } from 'src/app/shared/models/resources/organisation-resource.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsSchemeApiService extends ApiSrmService {

  constructor( httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
    super(httpClient, config, localeService);
    this.apiSearchDataPath = 'organisationScheme';
    this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}organisationschemes/${ApiSrmUrlConstants.LATEST_QUERY}`; ///v1.0/organisationschemes/?query=LATEST%20EQ%20%27true%27
    this.apiDetailUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ORGANISATION_SCHEME_API_URL}` ///v1.0/organisationschemes/{agencyID}/{resourceID}/{version}
    this.apiDetailForFileUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ORGANISATIONS_BY_ORGANISATION_SCHEME_API_URL}`///v1.0/organisationschemes/{agencyID}/{resourceID}/{version}/organisations;
    this.apiChildrenTreeUrl = `${ApiSrmUrlConstants.ORGANISATIONS_API_URL}`; ///api/organisations/{urn}/organisations

    this.apiAllVersionsFromResourceUrl = `${ApiSrmUrlConstants.ORGANISATION_ALL_VERSIONS_API_URL}`;
  }

  public setApiSearchUrl(): void {
      const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.LATEST_QUERY : '';
      this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}organisationschemes/${latestQuery}`;
  }

  public getDataDetailOrganisationSchemeResourceFromSrm(dataDetail: any): Observable<OrganisationResource> {
    const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
    const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(dataDetail));
    return forkJoin(
        {
          data: this.httpClient.get<any>(url),
          maintainer: this.httpClient.get<any>(urlMaintainer)
        }
    ).pipe(
        map(({ data, maintainer }) => {
              return OrganisationResource.organisationResource(data, maintainer, this.localeService);
            }
        ));
  }
}
