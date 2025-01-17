import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { DsdResource } from 'src/app/shared/models/resources/dsd-resource.model';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';

@Injectable({
    providedIn: 'root',
})
export class DsdApiService extends ApiSrmService {

    public apiDataStructureComponentsDataPath = 'dataStructureComponents';
    public apiDimensionDataPath = 'dimensions';
    public apiAttributeDataPath = 'attributes';
    public apiMeasureDataPath = 'measure';
    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'dataStructure';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}datastructures/${ApiSrmUrlConstants.LATEST_QUERY}`;
        this.apiDetailUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.DSD_API_URL}`;
        this.apiDetailForFileUrl = this.apiDetailUrl;
        this.apiAllVersionsFromResourceUrl = `${ApiSrmUrlConstants.DSD_ALL_VERSIONS_API_URL}`;
    }

    public setApiSearchUrl(): void {
        const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.LATEST_QUERY : '';
        const apiAgencyDataPath = this.agencyId !== '' ? `${this.agencyId}/` : this.agencyId;
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}datastructures/${apiAgencyDataPath}${latestQuery}`;

    }

    public getDataDetailDsdResourceFromSrm(dataDetail: any): Observable<DsdResource> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiMaintainerUrl(dataDetail));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
                maintainer: this.httpClient.get<any>(urlMaintainer)
            }
        ).pipe(
            map(({ data, maintainer }) => {
                    return DsdResource.dsdResource(data, maintainer, this.localeService);
                }
            ));
    }

    public getDimensionAndAttributeAndMeasureData(resource: DsdResource) {
        const api = this.apiDetailUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
    }

}
