import { Injectable } from '@angular/core';
import { Resource } from '../../models/resources/resource.model';
import { ApiService } from '../../../core/services/api/structural-resources/api.service';
import { LocaleService } from '../../../core/services/locale.service';
import { SearchConfig } from '../../models/search-config';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseBasicSearchComponent {

    public searchConfig: SearchConfig = {
        resultLimit: 20,
        resultOffset: 0,
        resultSize: 0,
        currentPage: 0,
    };

    public dataSearch: any[] = [];
    public searchForm: any;

    public detailForm: any;

    public dataSearchLoaded: boolean = false;
    public dataDetail: Resource | undefined;

    constructor(public apiService: ApiService, public localeServie?: LocaleService) {}

    abstract loadInitialData(): void;
    abstract onScrollDown($event: IInfiniteScrollEvent): void;
    abstract onScrollUp($event: IInfiniteScrollEvent): void;
    abstract onSearch(): void;

    public onReset(): void {
        this.searchForm.reset();
        this.onSearch();
    }
    public onLoadDetail(urn: string): void {
        this.dataDetail = new Resource(urn);
        this.apiService.getDetailFromStructureResource(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeServie ? this.localeServie.getTextValue(data.description?.text) : ' '),
                (this.dataDetail!.name = this.localeServie ? this.localeServie.getTextValue(data.name?.text) : ' '),
                this.updateDetailForm();
        });
    }

    public updateDetailForm(): void {
        this.detailForm.patchValue(this.dataDetail);
    }
}