import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService extends ApiSrmService{
  
 constructor( httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
    super(httpClient, config, localeService);
    this.apiSearchDataPath = 'category';
    this.apiSearchUrl = '/v1.0/categoryschemes/~all/~all/~latest/categories?query=CATEGORY_SCHEME_LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}/categories/{id}';
    this.apiChildrenUrl = '/api/categories/{urn}/categories';
    this.apiChildrenTreeUrl = '/api/categories/{urn}/categories';
    this.apiChildrenDataPath = '';
    this.apiSchemeUrl = '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}';
  }

  public setApiSearchUrl(): void {
    if (this.isLatestVersion) {
      this.apiSearchUrl = this.apiSearchUrl.concat('?query=CATEGORY_SCHEME_LATEST%20EQ%20%27true%27')
    }
    this.apiSearchUrl = '/v1.0//v1.0/categoryschemes/~all/~all/~latest/categories/';
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
