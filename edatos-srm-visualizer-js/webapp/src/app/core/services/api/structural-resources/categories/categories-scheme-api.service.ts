import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriesSchemeApiService extends ApiSrmService {

 constructor( httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
    super(httpClient, config, localeService);
    this.apiSearchDataPath = 'categoryScheme';
    this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}categoryschemes/${ApiSrmUrlConstants.LATEST_QUERY}`;
    this.apiDetailUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CATEGORY_SCHEME_API_URL}`;
    this.apiDetailForFileUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CATEGORIES_BY_CATEGORY_SCHEME_API_URL}`;
    this.apiChildrenTreeUrl =  `${ApiSrmUrlConstants.CATEGORIES_API_URL}`;
    this.apiChildrenDataPath = '';
    this.apiAllVersionsFromResourceUrl = `${ApiSrmUrlConstants.CATEGORIES_ALL_VERSIONS_API_URL}`;
  }

  public setApiSearchUrl(agencyId?: string): void {
      const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.LATEST_QUERY : '';
      const apiAgencyDataPath = agencyId ? `${agencyId}/` : '';
      this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}categoryschemes/${apiAgencyDataPath}${latestQuery}`;
  }

    public getDataDetailCategorySchemeResourceFromSrm(dataDetail: any): Observable<CategoryResource> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiMaintainerUrl(dataDetail));
        return forkJoin(
            {
                data: this.httpClient.get<any>(url),
                maintainer: this.httpClient.get<any>(urlMaintainer)
            }
        ).pipe(
            map(({ data, maintainer }) => {
                    return CategoryResource.categoryResource(data, maintainer, this.localeService);
                }
            ));
    }
}
