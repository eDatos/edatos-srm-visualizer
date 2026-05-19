import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CodelistsApiService } from 'src/app/core/services/api/structural-resources/codelist/codelists-api.service';

import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from 'src/app/core/services/locale.service';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-codelist-search',
    templateUrl: './codelist-search.component.html',
    styleUrls: ['./codelist-search.component.scss']
})
export class CodelistSearchComponent extends BasicSearchComponent implements OnInit {
    public showRecommendedCodelists = false;

    constructor(protected override formBuilder: FormBuilder, protected override apiService: CodelistsApiService,
                protected override translateService: TranslateService, protected override localeService: LocaleService) {

        super(apiService, formBuilder, translateService, localeService);

        this.searchForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: ''
        });

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            scheme: ''
        });

        this.fields = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id', enabled: true, sortable: true, showFilteredValues: false },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name', enabled: true, sortable: true, showFilteredValues: false, showTooltip: true },
            { name: this.translateService.instant('resourceParameters.description'), value: 'description', enabled: false, sortable: false, showFilteredValues: false, showTooltip: true },
            { name: this.translateService.instant('resourceParameters.maintainer'), value: 'maintainer', enabled: true, sortable: false, showFilteredValues: true },
            { name: this.translateService.instant('resourceParameters.recommended'), value: 'recommended', enabled: true, sortable: false, showFilteredValues: true }
        ];

        this.selectedDefault = this.fields.filter(opt => opt.enabled);
        this.searchSimpleForm = this.formBuilder.group({
            filter: '',
            selectedFields: [this.selectedDefault],
            showAllVersions: [false]
        });

    }

    ngOnInit(): void {
        this.apiService.isRecommended = false;
        this.loadInitialData();
    }

    public override loadInitialData(resetPagination?: boolean): void {
        this.refreshRecommendedCodelist();
        super.loadInitialData();
    }

    private refreshRecommendedCodelist() {
        this.apiService.isRecommended = this.markedSearchAdvanced && this.showRecommendedCodelists;
        this.showRecommendedCodelists = this.apiService.isRecommended;
        this.apiService.setApiSearchUrl();
    }

    public onSearchWithIsRecommended(event: any) {
        this.apiService.isRecommended = !this.markedSearchAdvanced ? false : event.checked;
        this.showRecommendedCodelists = this.apiService.isRecommended;
        this.tableExpandable.showRecommendedFilter = !this.showRecommendedCodelists;
        this.resetAutocomplete();
        this.apiService.setApiSearchUrl();
        this.getAdvancedSearch();
    }

    public onLoadCodelistDetail(urn: string): void {
        this.dataDetail = new CodelistResource(urn);
        this.apiService.getDetailFromSrm(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeService.getTextValue(data.description?.text));
            (this.dataDetail!.name = this.localeService.getTextValue(data.name?.text));
            this.detailForm.patchValue(this.dataDetail);
        });
        this.routerLinkDetail = this.dataDetail?.agency + '/' + this.dataDetail?.resourceId + '/' + this.dataDetail?.version + '/detail';
    }

    protected getDataChildren(resources: Resource[]): Observable<TreeNode[]> {
        this.apiService.translateService = this.translateService;
        return this.apiService.findAllResourcesDetailsWithMaintainerFromSrm(resources, this.apiService.isLatestVersion);
    }
}
