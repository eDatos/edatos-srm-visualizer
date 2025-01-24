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
import { Column, sortColumns } from 'src/app/shared/models/table/column.model';
import { BuildQueryHelper } from 'src/app/core/services/helper/build-query-helper';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-basic-search',
    templateUrl: './basic-search.component.html'
})
export abstract class BasicSearchComponent {

    @ViewChild('tableExpandable') tableExpandable!: TableExpandableRows;
    @ViewChild('searchResults') searchResults: ElementRef | undefined;
    @ViewChild('multiSelect', { static: false }) multiSelect!: MultiSelect;

    public advancedSearch = false;
    public showAllVersions = false;
    public selectedDefault: Column[] = [];
    public selectedFields: Column[] = [];
    public maintainers: string[] = [];
    public filter = '';
    public markedSearchAdvanced = false;
    public markedViewAllVersions = false;

    public searchConfig: SearchConfig = {
        resultLimit: 25,
        resultOffset: 0,
        resultSize: 0,
        currentPage: 0,
        orderColumn: "",
        sortOrder: ""
    };

    public dataSearch: any[] = [];
    public fields: Column[] = [];

    initialForm = new FormBuilder().group({
        filter: ['', Validators.required],
        selectedFields: [this.selectedDefault],
        showAllVersions: [false]
    });
    public searchSimpleForm = this.initialForm;
    public searchForm: FormGroup = new FormGroup({});

    public detailForm: any;
    public dataDetail: Resource | undefined;
    public dataChildren: TreeNode[] = [];
    public routerLinkDetail: string = '';

    protected buildQueryHelper: BuildQueryHelper = new BuildQueryHelper();

    protected constructor(
        protected apiService: ApiSrmService,
        protected formBuilder: FormBuilder,
        protected translateService: TranslateService,
        protected localeService: LocaleService
    ) {}

    public loadInitialData() {
        this.isLatestVersion();
        this.resetFilteredAgency();
        this.dataChildren = [];
        this.columnsToDisplay();
        this.apiService.getSearch(this.searchConfig).subscribe((data) => {
            this.dataSearch = data[this.apiService.apiSearchDataPath];
            this.searchConfig.resultSize = data['total'];
            this.loadDetailDataChildren();
        });
    }

    public onSearchWithAllVersions(event: any): void {
        this.markedViewAllVersions = !this.markedSearchAdvanced ? false : event.checked;
        this.isLatestVersion();
        this.getAdvancedSearch();
    }

    private isLatestVersion(){
        this.apiService.isLatestVersion = !this.markedSearchAdvanced ? true : !this.markedViewAllVersions;
        this.showAllVersions = !this.apiService.isLatestVersion;
        this.apiService.setApiSearchUrl();
    }

    public toggleVisibility(event: any) {
        this.markedSearchAdvanced = event.checked;
        this.showAllVersions = false;
        const emptySearchSimpleForm = this.isEmptyForm(this.searchSimpleForm.value);
        const emptySearchAdvancedForm = this.isEmptyForm(this.tableExpandable.searchAdvancedForm.value);
        const emptyFilteredAgency = this.apiService.agencyId !== '' ? false : true;

        if (this.markedSearchAdvanced) {
            this.getMaintainers();
        }

        if (!emptySearchSimpleForm) {
            this.resetSearchSimpleForm();
        } else if (!emptySearchAdvancedForm || !emptyFilteredAgency) {
            this.resetSearchAdvancedForm();
        }
    }

    private resetSearchAdvancedForm() {
        this.tableExpandable.searchAdvancedForm.reset();
        this.resetSearch();
    }

    private resetSearchSimpleForm() {
        this.resetForm(this.searchSimpleForm, this.initialForm);
        this.resetSearch();
    }

    private resetFilteredAgency() {
        this.apiService.agencyId = '';
        this.apiService.setApiSearchUrl();
    }

    private resetSearch() {
        this.defaultParametersSearch();
        this.resetSortColumn();
        this.loadInitialData();
    }


    private resetSearchAdvancedFormByColumn(column: string) {
        const emptyFilterAdvancedForm = this.tableExpandable.searchAdvancedForm.value[column] !== '';
        const emptyFilteredAgency = column === "maintainer";
        if (emptyFilteredAgency && emptyFilterAdvancedForm) {
            this.onFilterByAgency("");
        } else if (emptyFilterAdvancedForm) {
            this.tableExpandable.applyFilters(column, "");
        }
    }

    public onSelectFields(event: any) {
        event.itemValue.enabled = !event.itemValue.enabled;
        this.columnsToDisplay();
        if (!event.itemValue.enabled) {
            this.resetSearchAdvancedFormByColumn(event.itemValue.value);
        }
    }

    public onFilterByAgency(event: any) {
        this.tableExpandable.searchAdvancedForm.controls['maintainer'].setValue(event);
        this.apiService.agencyId = event;
        this.apiService.setApiSearchUrl();
        this.getAdvancedSearch();
    }

    public handleOnPanelShow() {
        this.multiSelect.dropdownIcon = 'fa-solid fa-chevron-up';
    }

    public handleOnPanelHide() {
        this.multiSelect.dropdownIcon = 'fa-thin fa-chevron-down';
    }

    public onScrollDown($event: IInfiniteScrollEvent) {
        this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
        let query = this.buildQueryHelper.buildQueryResultOffset(this.markedSearchAdvanced ? this.tableExpandable.searchAdvancedForm : this.searchSimpleForm, this.searchForm, this.apiService.isLatestVersion, this.markedSearchAdvanced);
        this.apiService.getSearch(this.searchConfig, query).subscribe((data) => {
            if (data[this.apiService.apiSearchDataPath]) {
                this.dataSearch = data[this.apiService.apiSearchDataPath];
                this.loadDetailDataChildren();
            }
        });
    }

    public onSearch(): void {
        this.defaultParametersSearch();
        this.mapper(this.searchForm.controls);
        if (this.searchForm.valid) {
            this.apiService.getSearchFromForms(this.searchConfig, this.searchForm).subscribe((data) => {
                this.searchConfig.resultSize = data['total'];
                if (this.searchConfig.resultSize > 0) {
                    this.dataSearch = data[this.apiService.apiSearchDataPath];
                    this.loadDetailDataChildren();
                } else if (this.searchConfig.resultSize == 0) {
                    this.tableExpandable.dataLoaded = true;
                }
            });
        }
    }

    public onAdvancedSearch(event: any): void {
        // @ts-ignore
        this.tableExpandable.searchAdvancedForm.controls[event.column].setValue(event.filterValue);
        if (this.searchForm.valid) {
            this.getAdvancedSearch();
        }
    }

    public getAdvancedSearch() {
        this.defaultParametersSearch();
        this.apiService.getAdvancedSearchFromForms(this.searchConfig, this.tableExpandable.searchAdvancedForm).subscribe((data) => {
            this.searchConfig.resultSize = data['total'];
            if (this.searchConfig.resultSize > 0) {
                this.dataSearch = data[this.apiService.apiSearchDataPath];
                this.loadDetailDataChildren();
            } else if (this.searchConfig.resultSize == 0) {
                this.tableExpandable.dataLoaded = true;
            }
        });
    }

    public defaultParametersSearch(): void {
        this.searchConfig.currentPage = 0;
        this.searchConfig.resultOffset = 0;
        this.searchConfig.resultSize = 0;
        this.dataSearch = [];
        this.dataChildren = new Array<TreeNode>();
        // @ts-ignore
        this.searchResults.nativeElement.scrollTop = 0;
        this.tableExpandable.dataLoaded = false;
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
            return { name: field.name, value: field.value, enabled: field.enabled, sortable: field.sortable, showFilteredValues: field.showFilteredValues };
        }).filter((field: any) => field.enabled);
        this.selectedFields = sortColumns(this.selectedFields, this.fields);
        this.initialForm.value.selectedFields = this.selectedFields;
    }



    public getMaintainers () {
        let filteredColumns = this.selectedFields.filter(column => column.showFilteredValues);
        if (filteredColumns.length > 0 && this.maintainers.length == 0) {
            this.apiService.getAllMaintainers().subscribe((data) => {
                if (data) {
                    data.agency?.forEach((maintainer: any) => {
                        this.maintainers.push(maintainer.id);
                    });
                }
            });
            this.tableExpandable.options = this.maintainers;
        }
    }

    private resetSortColumn() {
        this.searchConfig.orderColumn = "";
        this.searchConfig.sortOrder = "";
        this.tableExpandable.columnToSort.columnName = "";
    }

    private loadDetailDataChildren() {
        const resources: Resource[] = this.dataSearch.map((resource: any) => new Resource(resource.urn));
        this.getDataChildren(resources).subscribe((data) => {
            this.dataChildren = [...this.dataChildren, ...data];
            this.tableExpandable.dataLoaded = true;
        });
    }

    public resetForm(form: FormGroup, value?: FormGroup) {
        value ? form.reset(value.value) : form.reset(); 
    }

    public isEmptyForm(formValues: any) {
        return Object.keys(formValues).filter(k => k!=='showAllVersions' && k!== 'selectedFields').map(key => formValues[key]).filter(v => !!v).length == 0; 
    }

    public onSortColumn(event: any): void {
        this.searchConfig.orderColumn = event.column;
        this.searchConfig.sortOrder = event.sortOrder;
        this.markedSearchAdvanced ? this.getAdvancedSearch() : this.onSearch();
    }

    protected abstract getDataChildren(resources: Resource[]): Observable<TreeNode[]>;
}
