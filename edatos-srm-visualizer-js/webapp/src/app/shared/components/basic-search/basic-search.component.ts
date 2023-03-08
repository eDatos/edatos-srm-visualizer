
import { Component, OnInit } from '@angular/core';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Constants } from '../../models/constants';
import { Resource } from '../../models/resources/resource.model';
import { SearchConfig } from '../../models/search-config';
import { TreeNode } from '../../models/tree/tree-node';



@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.scss']
})
export abstract class BasicSearchComponent {

  currentLang: string | null = localStorage.getItem(Constants.chosenLocale);

  searchConfig: SearchConfig = {
    resultLimit: 20,
    resultOffset: 0,
    resultSize: 0,
    currentPage: 0
  }

  dataSearch: any[] = [];
  searchForm: any;

  dataDetail: Resource | undefined;
  detailForm: any;

  dataChildrensLoaded: boolean = false;
  dataChildrens: TreeNode[] = [];


  constructor(public apiService: ApiService, private localeServie?: LocaleService) { }


  loadInitialData() {
    this.apiService.getSearch(this.searchConfig)
      .subscribe((data) => {
        this.dataSearch = data[this.apiService.apiSearchDataPath];
        this.searchConfig.resultSize = data["total"];
        this.dataChildrens = this.dataSearch.map(resource => {
          return {
            name: this.localeServie ? this.localeServie.getTextValue(resource.name.text) : '',
            id: resource.id,
            urn: resource.urn
          }
        })
        this.dataChildrensLoaded = true;
      })
  }

  onScrollDown($event: IInfiniteScrollEvent) {
    this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
    this.apiService.getSearch(this.searchConfig).subscribe((data) => {
      this.dataSearch.push(...data[this.apiService.apiSearchDataPath]);
      this.dataChildrens = this.dataSearch.map(resource => {
        return {
          name: this.localeServie ? this.localeServie.getTextValue(resource.name.text) : ' ',
          id: resource.id,
          urn: resource.urn
        }
      })
    });
  }

  onScrollUp($event: IInfiniteScrollEvent) {
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.apiService.getSearchFromForms(this.searchConfig, this.searchForm).subscribe((data) => {
        this.searchConfig.resultSize = data["total"];
        this.dataChildrens = data[this.apiService.apiSearchDataPath].map((element: any) => {
          return {
            name: this.localeServie ? this.localeServie.getTextValue(element.name.text) : ' ',
            id: element.id,
            urn: element.urn
          }
        })
      });
    }
  }

  onReset(): void {
    this.searchForm.reset();
  }

  onLoadDetail(urn: string): void {
    this.dataDetail = new Resource(urn);
    this.apiService.getDetailFromStructureResource(this.dataDetail).subscribe((data) => {
      this.dataDetail!.description = this.localeServie ? this.localeServie.getTextValue(data.description?.text) : ' ',
      this.dataDetail!.name = this.localeServie ? this.localeServie.getTextValue(data.name?.text) : ' ',
      this.updateDetailForm()
    });
  }

  updateDetailForm(): void {
    this.detailForm.patchValue(this.dataDetail)
  }

}
