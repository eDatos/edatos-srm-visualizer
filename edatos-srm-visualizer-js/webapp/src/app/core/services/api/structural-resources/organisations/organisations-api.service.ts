import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { OrganisationResource } from 'src/app/shared/models/resources/organisation-resource.model';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';

@Injectable({
    providedIn: 'root'
})
export class OrganisationsApiService extends ApiSrmService {
    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'organisation';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ALL_ORGANISATIONS_SCHEMES_API_URL}${ApiSrmUrlConstants.ORGANISATION_SCHEME_LATEST_QUERY}`; //'/v1.0/organisationschemes/~all/~all/~latest/organisations/?query=ORGANISATION_SCHEME_LATEST%20EQ%20%27true%27';
        this.apiDetailUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ORGANISATION_BY_ORGANISATION_SCHEME_API_URL}`;//v1.0/organisationschemes/{agencyID}/{resourceID}/{version}/organisations/{id}'
        this.apiChildrenTreeUrl = `${ApiSrmUrlConstants.ORGANISATIONS_API_URL}`; //api/organisations/{urn}/organisations';
        this.apiChildrenDataPath = '';
        this.apiSchemeUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ORGANISATION_SCHEME_API_URL}`; ///v1.0/organisationschemes/{agencyID}/{resourceID}/{version}
    }

    public setApiSearchUrl(): void {
        const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.ORGANISATION_SCHEME_LATEST_QUERY : '';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ALL_ORGANISATIONS_SCHEMES_API_URL}${latestQuery}`;
    }

    public getDataDetailOrganisationResourceFromSrm(dataDetail: any): Observable<OrganisationResource> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(dataDetail));
        const urlScheme = ApiSrmService.apiStructuralResource.concat(this.getApiSchemeUrl(dataDetail));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
                maintainer: this.httpClient.get<any>(urlMaintainer),
                scheme: this.httpClient.get<any>(urlScheme)
            }
        ).pipe(
            map(({ data, maintainer, scheme }) => {
                    return OrganisationResource.organisationResource(data, maintainer, this.localeService, scheme);
                }
            ));
    }
}
