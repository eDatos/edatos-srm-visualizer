import { Component, OnInit } from '@angular/core';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Constants } from '../../models/constants';
import { Resource } from '../../models/resources/resource.model';
import { SearchConfig } from '../../models/search-config';
import { BaseBasicSearchComponent } from './base-basic-search';

@Component({
    selector: 'app-basic-search',
    templateUrl: './basic-search.component.html',
})
export abstract class BasicSearchComponent extends BaseBasicSearchComponent {
    constructor(public override apiService: ApiService, public override localeServie?: LocaleService) {
        super(apiService, localeServie);
    }

    public loadInitialData() {
        this.apiService.getSearch(this.searchConfig).subscribe((data) : void => {
            this.dataSearch = data[this.apiService.apiSearchDataPath];
            this.dataSearch = this.dataSearch.map((resource) => {
                return {
                    name: this.localeServie ? this.localeServie.getTextValue(resource.name.text) : '',
                    id: resource.id,
                    urn: resource.urn,
                };
            });
            this.dataSearchLoaded = true;
        });
    }

    public onScrollDown($event: IInfiniteScrollEvent): void {
        this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
        this.apiService.getSearch(this.searchConfig).subscribe((data) => {
            this.dataSearch.push(...data[this.apiService.apiSearchDataPath]);
        });
    }

    public onScrollUp($event: IInfiniteScrollEvent) {}

    public onSearch(): void {
        if (this.searchForm.valid) {
            this.apiService.getSearchFromForms(this.searchConfig, this.searchForm).subscribe((data) => {
                this.searchConfig.resultSize = data['total'];
            });
        }
    }

}
