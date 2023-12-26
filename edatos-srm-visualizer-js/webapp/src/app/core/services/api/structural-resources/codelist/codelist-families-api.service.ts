import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';
import { LocaleService } from 'src/app/core/services/locale.service';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Resource } from '../../../../../shared/models/resources/resource.model';
import {
    TreeNode,
    treeNodeWithMaintainer
} from '../../../../../shared/models/tree/tree-node';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';


@Injectable({
    providedIn: 'root',
})
export class CodelistFamiliesApiService extends ApiSrmService {

    public apiFamilyCodelistUrl: string = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CODELISTS_BY_CODELIST_FAMILY_URN_API_URL}${ApiSrmUrlConstants.AND_LATEST_QUERY}`;
    public apiCodelistDataPath = 'codelist';
    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'codelistFamily';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ALL_CODELISTS_FAMILIES_API_URL}`;
        this.apiDetailUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CODELIST_FAMILY_API_URL}`;
    }

    public setApiSearchUrl(): void {}

    public loadFamilyCodelist(codelistFamilyUrn: string): Observable<any> {
        return this.getData(ApiSrmService.apiStructuralResource.concat(this.apiFamilyCodelistUrl.replace('{codelistFamilyUrn}', codelistFamilyUrn)));
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

    public findAllRelatedCodelistDetailsFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDataDetailCodelistResourceFromSrm(resource, isLatestVersion))
        );
    }

    public getDataDetailCodelistResourceFromSrm(resource: any, isLatestVersion: boolean): Observable<TreeNode> {
        const maintainer = new Resource(resource.urn).agency;
        return of(treeNodeWithMaintainer(maintainer, resource, isLatestVersion, this.localeService));
    }
}
