import { Component, ElementRef, ViewChild } from '@angular/core';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableTreeComponent } from '../table-tree/table-tree.component';
import { TranslateService } from '@ngx-translate/core';
import { MultiSelect } from 'primeng/multiselect';
import { TableExpandableRows } from '../table/table-row-expand.component';


@Component({
    selector: 'app-basic-tree-search',
    templateUrl: './basic-tree-search.component.html'
})
export abstract class BasicTreeSearchComponent {

    @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;
    @ViewChild('tableExpandable') tableExpandable!: TableExpandableRows;
    @ViewChild('searchResults') searchResults: ElementRef | undefined;
    @ViewChild('multiSelect', { static: false }) multiSelect!: MultiSelect;
    advancedSearch = false;
    showAllVersions = false;
    selectedDefault: any[] = [];
    filter = '';
    marked = false;


    public searchConfig: SearchConfig = {
        resultLimit: 25,
        resultOffset: 0,
        resultSize: 0,
        currentPage: 0
    };

    public dataSearch: any[] = [];
    public searchSimpleForm: FormGroup = this.formBuilder.group({
        filter: ['', Validators.required]
    });
    public searchForm: FormGroup = new FormGroup({});

    public detailForm: any;

    public dataDetail: Resource | undefined;
    public dataChildrenLoaded: boolean = false;
    public dataChildren: TreeNode[] = [];
    public foo: TreeNode[] = [];

    protected constructor(protected apiService: ApiService, protected formBuilder: FormBuilder, protected translateService: TranslateService, protected localeService?: LocaleService) {
    }

    public loadInitialData() {
        this.apiService.getSearch(this.searchConfig).subscribe((data) => {
            this.dataSearch = data[this.apiService.apiSearchDataPath];
            this.searchConfig.resultSize = data['total'];
            this.mapperResource();
            this.dataChildrenLoaded = true;
        });
    }

    private mapperResource() {
        this.dataSearch.forEach((resource) => {
            this.apiService.getDetailFromStructureResource(new Resource(resource.urn)).subscribe((data) => {
                const bar: TreeNode = {
                    name: this.localeService ? this.localeService?.getTextValue(resource.name.text) : '',
                    id: resource.id,
                    urn: resource.urn,
                    description: this.localeService ? this.localeService?.getTextValue(data.description?.text) : '',
                    selfLink: resource.selfLink.href
                };
                this.dataChildren = [...this.dataChildren, bar];
            });
        });
    }

    public toggleVisibility(e: any) {
        this.marked = e.checked;
    }

    public handleOnPanelShow() {
        this.multiSelect.dropdownIcon = 'fa-solid fa-chevron-up';
    }

    public handleOnPanelHide() {
        this.multiSelect.dropdownIcon = 'fa-thin fa-chevron-down';
    }

    public onScrollDown($event: IInfiniteScrollEvent) {
        this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
        this.apiService.getSearch(this.searchConfig, this.buildQueryResultOffset()).subscribe((data) => {
            if (data[this.apiService.apiSearchDataPath]) {
                this.mapperResource();
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
                if (this.searchConfig.resultSize > 0) {
                    this.dataSearch = data[this.apiService.apiSearchDataPath];
                    this.mapperResource();
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

    public onLoadDetail(urn: string): void {
        this.dataDetail = new Resource(urn);
        this.apiService.getDetailFromStructureResource(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeService ? this.localeService.getTextValue(data.description?.text) : ' ');
            (this.dataDetail!.name = this.localeService ? this.localeService.getTextValue(data.name?.text) : ' ');
            this.updateDetailForm();
        });
    }


    private updateDetailForm(): void {
        this.detailForm.patchValue(this.dataDetail);
    }

    private onSearchSimple(): void {
        if (!this.searchSimpleForm.valid) {
            this.onReset();
        }
        this.mapper(this.searchForm.controls);
    }

    public onReset(): void {
        this.searchSimpleForm.reset();
        this.defaultParametersSearch();
        this.loadInitialData();
    }

    private mapper<T>(obj: T) {
        // @ts-ignore
        Object.keys(obj).forEach((key) => {
            // @ts-ignore
            obj[key] = this.searchSimpleForm.value.filter;
        });
    }

}

