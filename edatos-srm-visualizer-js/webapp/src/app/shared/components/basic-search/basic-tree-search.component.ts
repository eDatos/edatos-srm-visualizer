import { Component, ElementRef, ViewChild } from '@angular/core';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableTreeComponent } from '../table-tree/table-tree.component';

@Component({
    selector: 'app-basic-tree-search',
    templateUrl: './basic-tree-search.component.html'
})
export abstract class BasicTreeSearchComponent {

    @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;
    @ViewChild('searchResults') searchResults: ElementRef | undefined;

    public searchConfig: SearchConfig = {
        resultLimit: 25,
        resultOffset: 0,
        resultSize: 0,
        currentPage: 0
    };

    public dataSearch: any[] = [];
    public searchSimpleForm: FormGroup =  this.formBuilder.group({
        filter: ['', Validators.required],
    });
    public searchForm: FormGroup = new FormGroup({});

    public detailForm: any;

    public dataDetail: Resource | undefined;
    public dataChildrenLoaded: boolean = false;
    public dataChildren: TreeNode[] = [];

    protected constructor(protected apiService: ApiService, protected formBuilder: FormBuilder, protected localeService?: LocaleService) {}

    public loadInitialData() {
        this.apiService.getSearch(this.searchConfig).subscribe((data) => {
            this.dataSearch = data[this.apiService.apiSearchDataPath];
            this.searchConfig.resultSize = data['total'];
            this.dataChildren = this.dataSearch.map((resource) => {
                return {
                    name: this.localeService ? this.localeService.getTextValue(resource.name.text) : '',
                    id: resource.id,
                    urn: resource.urn
                };
            });
            this.dataChildrenLoaded = true;
        });
    }

    public onScrollDown($event: IInfiniteScrollEvent) {
        this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
        this.apiService.getSearch(this.searchConfig, this.buildQueryResultOffset()).subscribe((data) => {
            if(data[this.apiService.apiSearchDataPath]) {
                this.dataSearch.push(...data[this.apiService.apiSearchDataPath]);
                this.dataChildren = this.dataSearch.map((resource) => {
                    return {
                        name: this.localeService ? this.localeService.getTextValue(resource.name.text) : ' ',
                        id: resource.id,
                        urn: resource.urn
                    };
                });
            }
        });
    }

    private buildQueryResultOffset() {
        return this.searchSimpleForm.valid ? this.apiService.buildQueryFromForm(this.searchForm) : '';
    }

    public onScrollUp($event: IInfiniteScrollEvent) {}

    public onSearch(): void {
        this.defaultParametersSearch();
        this.onSearchSimple();
        if (this.searchForm.valid) {
            this.apiService.getSearchFromForms(this.searchConfig, this.searchForm).subscribe((data) => {
                this.searchConfig.resultSize = data['total'];
                if(this.searchConfig.resultSize > 0) {
                    this.dataSearch = data[this.apiService.apiSearchDataPath];
                    this.dataChildren = data[this.apiService.apiSearchDataPath].map((element: any) => {
                        return {
                            name: this.localeService ? this.localeService.getTextValue(element.name.text) : ' ',
                            id: element.id,
                            urn: element.urn
                        };
                    });
                }
            });
        }
    }

    private defaultParametersSearch(): void {
        this.searchConfig.currentPage = 0;
        this.searchConfig.resultOffset = 0;
        this.dataSearch = [];
        this.dataChildren = new Array<TreeNode>();
        // @ts-ignore
        this.searchResults.nativeElement.scrollTop = 0;
    }
    public onReset(): void {
        this.searchSimpleForm.reset();
        this.defaultParametersSearch();
        this.loadInitialData();
    }

    public onLoadDetail(urn: string): void {
        this.dataDetail = new Resource(urn);
        this.apiService.getDetailFromStructureResource(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeService ? this.localeService.getTextValue(data.description?.text) : ' '),
                (this.dataDetail!.name = this.localeService ? this.localeService.getTextValue(data.name?.text) : ' '),
                this.updateDetailForm();
        });
    }

    private updateDetailForm(): void {
        this.detailForm.patchValue(this.dataDetail);
    }

    private onSearchSimple(): void {
        if (this.searchSimpleForm.valid) {
            this.mapper(this.searchForm.controls);
        }
    }

    private mapper<T>(obj: T) {
        // @ts-ignore
        Object.keys(obj).forEach((key) => {
            // @ts-ignore
            obj[key] = this.searchSimpleForm.value.filter;
        });
    }
    
}

