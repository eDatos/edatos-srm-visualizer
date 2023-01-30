import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { ApiService } from 'src/app/core/services/api/api.service';
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

  searchConfig:  SearchConfig = {
    resultLimit: 20,
    resultOffset: 0,
    resultSize: 0,
    currentPage: 0
  }
  
  api: string = '';
  dataSearchPath: string = '';
  dataSearch: any[] = [];
  searchForm: any;

  dataDetail: Resource | undefined;
  apiDetail: string = '';
  detailForm: any;

  dataChildrensLoaded: boolean = false;
  dataChildrens: TreeNode[] = [];


  constructor(public apiService: ApiService, private localeServie?: LocaleService) {

  }


  loadInitialData () {
    console.log('Buscando ' + this.api)
    this.apiService.getDataWithOffset(this.api, this.searchConfig)
      .subscribe((data) => {
        console.log(data);
        this.dataSearch = data[this.dataSearchPath];
        this.searchConfig.resultSize = data["total"];
        this.dataChildrens = this.dataSearch.map(resource => {
          return {
            name: this.localeServie ? this.localeServie.getTextValue(resource.name.text) : '',
            id: resource.id,
            urn: resource.urn
          }
        })
        console.log('Buscando1')
        this.dataChildrensLoaded = true; 
      })
  }

 onScrollDown($event: IInfiniteScrollEvent) {
    this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
    this.apiService.getDataWithOffset(this.api, this.searchConfig).subscribe((data) => {
      this.dataSearch.push(...data[this.dataSearchPath]);
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
    console.log('Busqueda1');
    if (this.searchForm.valid) {
      this.apiService.getDataFromForm(this.api, this.searchConfig, this.searchForm).subscribe((data) => {
        console.log('Busqueda');
        console.log (data[this.dataSearchPath]);
        
        this.dataChildrens = data[this.dataSearchPath].map( (element: any) => {
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
    console.log(urn);
    this.dataDetail = new Resource(urn);
    console.log(this.apiDetail)
    let URL = this.apiDetail
      .replace('#AGENCY#', this.dataDetail.agency)
      .replace('#RESOURCEID#', this.dataDetail.resourceId)
      .replace('#VERSION#', this.dataDetail.version)
      .replace('#ID#', this.dataDetail.id);
      console.log(URL)
    this.apiService.getData(URL).subscribe((data) => {
      this.dataDetail!.description = this.localeServie ? this.localeServie.getTextValue(data.description?.text) : ' ',
        this.dataDetail!.name = this.localeServie ? this.localeServie.getTextValue(data.name?.text) : ' ',
        this.updateDetailForm()
    });
  }

  abstract updateDetailForm(): void;
}
