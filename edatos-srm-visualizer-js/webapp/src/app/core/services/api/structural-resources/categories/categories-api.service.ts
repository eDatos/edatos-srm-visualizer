import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { ApiSrmUrlConstants } from '../../../../../shared/models/api-srm-url-constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService extends ApiSrmService{
  
 constructor( httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
    super(httpClient, config, localeService);
    this.apiSearchDataPath = 'category';
    this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ALL_CATEGORY_SCHEMES_API_URL}${ApiSrmUrlConstants.CATEGORY_SCHEME_LATEST_QUERY}`;//'/v1.0/categoryschemes/~all/~all/~all/categories?query=CATEGORY_SCHEME_LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CATEGORY_BY_CATEGORY_SCHEME_API_URL}`;//'/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}/categories/{id}';
    this.apiChildrenTreeUrl = `${ApiSrmUrlConstants.CATEGORIES_API_URL}`;//'/api/categories/schemes/{urn}/categories';
    this.apiChildrenDataPath = '';
    this.apiSchemeUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.CATEGORY_SCHEME_API_URL}`;//'/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}';
  }

  public setApiSearchUrl(): void {
      const latestQuery = this.isLatestVersion ? ApiSrmUrlConstants.CATEGORY_SCHEME_LATEST_QUERY : '';
      this.apiSearchUrl = `${ApiSrmUrlConstants.API_SRM_VERSION}${ApiSrmUrlConstants.ALL_CATEGORY_SCHEMES_API_URL}${latestQuery}`;
  }

    public getDataDetailCategoryResourceFromSrm(dataDetail: any): Observable<CategoryResource> {
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
                    return CategoryResource.categoryResource(data, maintainer, this.localeService, scheme);
                }
            ));
    }

}
