import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoriesSchemeApiService extends ApiSrmService {

 constructor( httpClient: HttpClient, config: ConfigService, localeService: LocaleService) {
    super(httpClient, config, localeService);
    this.apiSearchDataPath = 'categoryScheme';
    this.apiSearchUrl = '/v1.0/categoryschemes/?query=LATEST%20EQ%20%27true%27';
    this.apiDetailUrl = '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}';
    this.apiDetailForFileUrl = '/v1.0/categoryschemes/{agencyID}/{resourceID}/{version}/categories';
    this.apiChildrenUrl = '/api/categories/schemes/{urn}/categories';
    this.apiChildrenTreeUrl = '/api/categories/schemes/{urn}/categories';
    this.apiChildrenDataPath = '';
    this.apiAllVersionsFromResourceUrl = '/api/categories/{urn}/all-versions';
  }

  public setApiSearchUrl(): void {
    if (this.isLatestVersion) {
      this.apiSearchUrl = this.apiSearchUrl.concat('?query=LATEST%20EQ%20%27true%27')
    }
    this.apiSearchUrl = '/v1.0/categoryschemes/';
  }

    public getDataDetailCategorySchemeResourceFromSrm(dataDetail: any): Observable<CategoryResource> {
        const url = ApiSrmService.apiStructuralResource.concat(this.getApiDetailUrl(dataDetail));
        const urlMaintainer = ApiSrmService.apiStructuralResource.concat(this.getApiManteinerUrl(dataDetail));
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
