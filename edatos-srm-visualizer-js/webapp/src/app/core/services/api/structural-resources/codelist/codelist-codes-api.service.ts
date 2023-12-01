import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { Observable } from 'rxjs/internal/Observable';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import {
    TreeNode,
    treeNodeWithMaintainerAndCodelistScheme
} from 'src/app/shared/models/tree/tree-node';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { TranslateService } from '@ngx-translate/core';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';


@Injectable({
    providedIn: 'root'
})
export class CodelistCodesApiService extends ApiSrmService {

    public apiEquivalentCodesUrl  = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ALL_CODES_API_URL}${ApiSrmUrlConstants.VARIABLE_ELEMENT_URN_QUERY}`;//'/v1.0/codelists/~all/~all/~all/codes?query=CODELIST_LATEST%20EQ%20'true'%20AND%20VARIABLE_ELEMENT_URN%20EQ%20%27{variableElementUrn}%27&fields=%2BvariableElement%2C%20%2B%20description';

    constructor(httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
        super(httpClient, config, localeService);
        this.apiSearchDataPath = 'code';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ALL_CODES_API_URL}${ApiSrmUrlConstants.CODELIST_LATEST_QUERY}`;//'/v1.0/codelists/~all/~all/~all/codes/?query=CODELIST_LATEST%20EQ%20%27TRUE%27';
        this.apiDetailUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CODE_BY_CODELIST_API_URL}`;//'/v1.0/codelists/{agencyID}/{resourceID}/{version}/codes/{id}?fields=%2BvariableElement%2C%20%2B%20description';
        this.apiChildrenTreeUrl = `${ApiSrmUrlConstants.CODELISTS_API_URL}`;//'/api/codelists/codelists/{urn}/codes';
        this.apiChildrenDataPath = '';
        this.apiSchemeUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CODELIST_API_URL}`;//'/v1.0/codelists/{agencyID}/{resourceID}/{version}'
    }

    public setApiSearchUrl(): void {
        const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.CODELIST_LATEST_QUERY : '';
        this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ALL_CODES_API_URL}${latestQuery}`;
    }

    public loadEquivalentCodes(variableElementUrn: string): Observable<any> {
        let api = this.apiEquivalentCodesUrl
            .replace('{variableElementUrn}', variableElementUrn)
        return this.getData(ApiSrmService.apiStructuralResource.concat(api));
    }

    public getDataDetailCodelistResourceFromSrm(dataDetail: any, translateService: TranslateService, isCodes: boolean): Observable<CodelistResource> {
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
                    return CodelistResource.codelistResource(data, maintainer, this.localeService, translateService, isCodes, scheme);
                }
            ));
    }

    public findAllDetailsWithMaintainerAndCodelistFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailWithMaintainerAndCodelistFromSrm(resource, isLatestVersion))
        );
    }
    public getDetailWithMaintainerAndCodelistFromSrm(resource: Resource, isLatestVersion: boolean): Observable<TreeNode> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(resource));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(resource));
        const urlCodelist = ApiSrmService.apiStructuralResource.concat(this.getApiSchemeUrl(resource));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
                maintainer: this.httpClient.get<any>(urlMaintainer),
                codelist: this.httpClient.get<any>(urlCodelist)
            }
        ).pipe(
            map(({data, maintainer, codelist}) => {
                    const maintainerName = this.localeService.getTextValue(maintainer.name.text);

                    const treeNode: TreeNode = {
                        name: this.localeService.getTextValue(data.name.text),
                        id: data.id,
                        urn: data.urn,
                        description: this.localeService.getTextValue(data.description?.text),
                        selfLink: data.selfLink.href,
                        maintainer: `${maintainer.id} - ${maintainerName}`,
                        scheme: isLatestVersion ? `${codelist.id} / ${maintainer.id} - ${maintainerName}` : `${codelist.id}(${codelist.version}) / ${maintainer.id} - ${maintainerName}`
                    };
                    return treeNode;
                }
            ));
    }

    public findAllOtherCodesDetailsFromSrm(resources: Resource[], isLatestVersion: boolean): Observable<TreeNode[]> {
        return forkJoin(
            resources.map(resource => this.getDetailOtherCodesWithMaintainerAndSchemeFromSrm(resource, isLatestVersion))
        );
    }
    public getDetailOtherCodesWithMaintainerAndSchemeFromSrm(resource: any, isLatestVersion: boolean): Observable<TreeNode> {
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(new Resource(resource.urn)));
        const urlScheme = ApiSrmService.apiStructuralResource.concat(this.getApiSchemeUrl(new Resource(resource.urn)));
        return forkJoin(
            {
                maintainer: this.httpClient.get<any>(urlMaintainer),
                codelistScheme: this.httpClient.get<any>(urlScheme)
            }
        ).pipe(
            map(({ maintainer, codelistScheme }) => {
                    return treeNodeWithMaintainerAndCodelistScheme(maintainer, codelistScheme, resource, isLatestVersion, this.localeService);
                }
            ));
    }




}

