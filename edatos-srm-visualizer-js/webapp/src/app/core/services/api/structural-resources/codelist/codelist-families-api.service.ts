import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';
import { LocaleService } from 'src/app/core/services/locale.service';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
    providedIn: 'root',
})
export class CodelistFamiliesApiService extends ApiSrmService {

    public apiFamilyCodelistUrl: string = '/v1.0/codelist/?query=CODELIST_FAMILY_URN%20EQ%20%27{variableUrn}%27';
    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'codelistFamily';
        this.apiSearchUrl = '/v1.0/codelistfamilies/';
        this.apiDetailUrl = '/v1.0/codelistfamilies/{id}/';
    }

    public setApiSearchUrl(): void {}

    public loadFamilyCodelist(variableUrn: string): Observable<any> {
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiFamilyCodelistUrl.replace('{variableUrn}', variableUrn)));
    }

    public getDataDetailFamilyCodelistResourceFromSrm(dataDetail: any): Observable<CodelistResource> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url)
            }
        ).pipe(
            map(({ data }) => {
                    return CodelistResource.familyCodelistResource(data, this.localeService);
                }
            ));
    }
}
