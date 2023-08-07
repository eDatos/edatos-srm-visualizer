import { Component, ElementRef, ViewChild } from '@angular/core';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MultiSelect } from 'primeng/multiselect';
import { TableExpandableRows } from 'src/app/shared/components/table/table-row-expand.component';
import { Column } from 'src/app/shared/models/table/column.model';
import { BuildQueryHelper } from '../../../core/services/helper/build-query-helper';

@Component({
    selector: 'app-basic-search',
    templateUrl: './basic-search.component.html'
})
export abstract class BasicSearchComponent {

    @ViewChild('tableExpandable') tableExpandable!: TableExpandableRows;
    @ViewChild('searchResults') searchResults: ElementRef | undefined;
    @ViewChild('multiSelect', { static: false }) multiSelect!: MultiSelect;
    advancedSearch = false;
    showAllVersions = false;
    selectedDefault: any[] = [];
    public selectedFields: Column[] = [];
    filter = '';
    marked = false;

    public searchConfig: SearchConfig = {
        resultLimit: 25,
        resultOffset: 0,
        resultSize: 0,
        currentPage: 0
    };

    public dataSearch: any[] = [];

    public fields: any[] = [];

    public searchSimpleForm = this.formBuilder.group({
        filter: ['', Validators.required],
        selectedFields: [this.selectedDefault],
        showAllVersions: [false]
    });

    public searchForm: FormGroup = new FormGroup({});

    public detailForm: any;

    public dataDetail: Resource | undefined;
    public dataChildrenLoaded: boolean = false;
    public dataChildren: TreeNode[] = [];

    public routerLinkDetail: string = '';

    protected isMapperWithMaintainer: boolean = true;
    protected buildQueryHelper: BuildQueryHelper = new BuildQueryHelper();

    protected constructor(protected apiService: ApiSrmService, protected formBuilder: FormBuilder,
                          protected translateService: TranslateService, protected localeService?: LocaleService) {
    }

    public loadInitialData() {
        this.columnsToDisplay();
        this.apiService.getSearch(this.searchConfig).subscribe((data) => {
            this.dataSearch = data[this.apiService.apiSearchDataPath];
            this.searchConfig.resultSize = data['total'];
            this.mapperResource();
            this.dataChildrenLoaded = true;
        });
    }

    public toggleVisibility(event: any) {
        this.marked = event.checked;
    }

    public onSelectFields() {
        this.columnsToDisplay();
    }

    public handleOnPanelShow() {
        this.multiSelect.dropdownIcon = 'fa-solid fa-chevron-up';
    }

    public handleOnPanelHide() {
        this.multiSelect.dropdownIcon = 'fa-thin fa-chevron-down';
    }

    public onScrollDown($event: IInfiniteScrollEvent) {
        this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
        let query = this.buildQueryHelper.buildQueryResultOffset(this.searchSimpleForm, this.searchForm);
        this.apiService.getSearch(this.searchConfig, query).subscribe((data) => {
            if (data[this.apiService.apiSearchDataPath]) {
                this.mapperResource();
            }
        });
    }

    public onScrollUp($event: IInfiniteScrollEvent) {
    }

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

    private onReset(): void {
        this.searchSimpleForm.reset();
        this.defaultParametersSearch();
        this.loadInitialData();
    }

    private defaultParametersSearch(): void {
        this.searchConfig.currentPage = 0;
        this.searchConfig.resultOffset = 0;
        this.dataSearch = [];
        this.dataChildren = new Array<TreeNode>();
        // @ts-ignore
        this.searchResults.nativeElement.scrollTop = 0;
    }

    private onSearchSimple(): void {
        if (!this.searchSimpleForm.valid) {
            this.onReset();
        }
        this.mapper(this.searchForm.controls);
    }

    private mapper<T>(obj: T) {
        // @ts-ignore
        Object.keys(obj).forEach((key) => {
            // @ts-ignore
            obj[key] = this.searchSimpleForm.value.filter;
        });
    }

    private columnsToDisplay() {
        // @ts-ignore
        this.selectedFields = this.searchSimpleForm.value.selectedFields.map((field: any) => {
            return { name: field.name, value: field.value };
        });
    }

    private mapperResource() {
        this.dataSearch.forEach((resource) => {
            this.apiService.getDetailFromSrm(new Resource(resource.urn)).subscribe((data) => {
                if(this.isMapperWithMaintainer) {
                    this.getDetailManteinerFromSrm(data);
                } else {
                    const resourceToTreeNode: TreeNode = {
                        name: this.localeService ? this.localeService?.getTextValue(data.name.text) : '',
                        id: data.id,
                        urn: data.urn,
                        description: this.localeService ? this.localeService?.getTextValue(data.description?.text) : '',
                        selfLink: data.selfLink.href,
                        maintainer: '',
                        scheme: ''
                    };
                    this.dataChildren = [...this.dataChildren, resourceToTreeNode];
                }
            });
        });
    }

    private getDetailManteinerFromSrm(data: any) {
        let node = new Resource(data.urn);
        this.apiService.getDetailManteinerFromSrm(node.agency).subscribe((maintainer) => {
            let nameMaintainer = this.localeService ? this.localeService?.getTextValue(maintainer.name.text) : '';

            const resourceToTreeNode: TreeNode = {
                name: this.localeService ? this.localeService?.getTextValue(data.name.text) : '',
                id: data.id,
                urn: data.urn,
                description: this.localeService ? this.localeService?.getTextValue(data.description?.text) : '',
                selfLink: data.selfLink.href,
                maintainer: maintainer.id + ' - ' + nameMaintainer,
                scheme: ''
            };
            this.mapResourceToDetail(resourceToTreeNode, node, maintainer);
            this.dataChildren = [...this.dataChildren, resourceToTreeNode];
        });
    }

    abstract mapResourceToDetail(resourceToTreeNode: TreeNode, resource: Resource, maintainer: any): void;
}
