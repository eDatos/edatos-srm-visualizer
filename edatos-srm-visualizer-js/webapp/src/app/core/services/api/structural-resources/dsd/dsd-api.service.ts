import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { DsdResource } from 'src/app/shared/models/resources/dsd-resource.model';
import { LocaleService } from '../../../locale.service';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryResource } from '../../../../../shared/models/resources/category-resource.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

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
        this.apiSearchUrl = '/v1.0/datastructures/?query=LATEST%20EQ%20%27true%27';
        this.apiDetailUrl = '/v1.0/datastructures/{agencyID}/{resourceID}/{version}';
        this.apiAllVersionsFromResourceUrl = '/api/datastructures/{urn}/all-versions';
    }

    public getApiSearchUrl(): string {
        if (this.isLatestVersion) {
            return this.apiSearchUrl = this.apiSearchUrl.concat('?query=LATEST%20EQ%20%27true%27')
        }
        return this.apiSearchUrl = '/v1.0/datastructures/';
    }

    public getDataDetailDsdResourceFromSrm(dataDetail: any): Observable<DsdResource> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(dataDetail));
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
