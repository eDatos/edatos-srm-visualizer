import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from '../../../locale.service';
import { Observable } from 'rxjs/internal/Observable';
import { OrganisationResource } from '../../../../../shared/models/resources/organisation-resource.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsSchemeApiService extends ApiSrmService {

  constructor( httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
    super(httpClient, config, localeService);
    this.apiSearchDataPath = 'organisationScheme';
    this.apiSearchUrl = '/v1.0/organisationschemes/?query=LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}';
    this.apiDetailForFileUrl = '/v1.0/organisationschemes/{agencyID}/{resourceID}/{version}/organisations';
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
