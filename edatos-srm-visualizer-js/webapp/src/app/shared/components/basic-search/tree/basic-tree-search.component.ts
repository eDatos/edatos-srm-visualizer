import { Component, OnInit } from '@angular/core';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Constants } from '../../../models/constants';
import { Resource } from '../../../models/resources/resource.model';
import { SearchConfig } from '../../../models/search-config';
import { TreeNode } from '../../../models/tree/tree-node';
import { BaseBasicSearchComponent } from '../base-basic-search';

@Component({
    selector: 'app-basic-tree-search',
    templateUrl: './basic-tree-search.component.html'
})
export abstract class BasicTreeSearchComponent extends BaseBasicSearchComponent {
    public dataChildrensLoaded: boolean = false;
    public dataChildrens: TreeNode[] = [];

    constructor(public override apiService: ApiService, public override localeServie?: LocaleService) {
        super(apiService, localeServie);
    }

    public loadInitialData() {
        this.apiService.getSearch(this.searchConfig).subscribe((data) => {
            this.dataSearch = data[this.apiService.apiSearchDataPath];
            this.searchConfig.resultSize = data['total'];
            this.dataChildrens = this.dataSearch.map((resource) => {
                return {
                    name: this.localeServie ? this.localeServie.getTextValue(resource.name.text) : '',
                    id: resource.id,
                    urn: resource.urn
                };
            });
            this.dataChildrensLoaded = true;
        });
    }

    public onScrollDown($event: IInfiniteScrollEvent) {
        this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
        this.apiService.getSearch(this.searchConfig).subscribe((data) => {
            this.dataSearch.push(...data[this.apiService.apiSearchDataPath]);
            this.dataChildrens = this.dataSearch.map((resource) => {
                return {
                    name: this.localeServie ? this.localeServie.getTextValue(resource.name.text) : ' ',
                    id: resource.id,
                    urn: resource.urn
                };
            });
        });
    }

    public onScrollUp($event: IInfiniteScrollEvent) {
    }

    public onSearch(): void {
        this.onSearchSimple();
        if (this.searchForm.valid) {
            this.apiService.getSearchFromForms(this.searchConfig, this.searchForm).subscribe((data) => {
                this.searchConfig.resultSize = data['total'];
                if(this.searchConfig.resultSize > 0){
                    this.dataChildrens = data[this.apiService.apiSearchDataPath].map((element: any) => {
                        return {
                            name: this.localeServie ? this.localeServie.getTextValue(element.name.text) : ' ',
                            id: element.id,
                            urn: element.urn
                        };
                    });
                }
                else {
                    this.dataChildrens = new Array<TreeNode>();
                }
            });
        }
    }
}

