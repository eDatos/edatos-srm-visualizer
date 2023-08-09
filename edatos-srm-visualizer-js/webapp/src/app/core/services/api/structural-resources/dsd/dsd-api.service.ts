import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { DsdResource } from 'src/app/shared/models/resources/dsd-resource.model';
import { LocaleService } from '../../../locale.service';

@Injectable({
    providedIn: 'root',
})
export class DsdApiService extends ApiSrmService {

    public apiDataStructureComponentsDataPath = 'dataStructureComponents'; //dimensions
    public apiDimensionDataPath = 'dimensions'; //dimensions
    public apiAttributeDataPath = 'attributes'; //attributes
    public apiMeasureDataPath = 'measure'; //primaryMeasure
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

    public getDimensionAndAttributeAndMeasureData(resource: DsdResource) {
        const api = this.apiDetailUrl
            .replace('{agencyID}', resource.agency)
            .replace('{resourceID}', resource.resourceId)
            .replace('{version}', resource.version)
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
    }

    /*

      public getOtherConcepts(resource: CodelistResource): Observable<any> {
    let api = this.apiOtherConceptsUrl
        .replace('{agencyID}', resource.agency)
        .replace('{resourceID}', resource.resourceId)
        .replace('{version}', resource.version)
    return this.getData(ApiService.apiStructuralResource.concat(api));
  }
     */
}
