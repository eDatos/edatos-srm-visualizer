import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocaleService } from 'src/app/core/services/locale.service';

import {
    OrganisationsApiService
} from 'src/app/core/services/api/structural-resources/organisations/organisations-api.service';
import { TranslateService } from '@ngx-translate/core';
import {
    OrganisationResource
} from 'src/app/shared/models/resources/organisation-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-organisations-search',
    templateUrl: './organisations-search.component.html',
    styleUrls: ['./organisations-search.component.scss']
})
export class OrganisationsSearchComponent extends BasicSearchComponent implements OnInit {

    constructor(protected override formBuilder: FormBuilder, protected override apiService: OrganisationsApiService,
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
            { name: this.translateService.instant('resourceParameters.name'), value: 'name', enabled: true, sortable: true, showFilteredValues: false },
            { name: this.translateService.instant('resourceParameters.scheme'), value: 'scheme', enabled: true, sortable: false, showFilteredValues: false }
        ];

        this.selectedDefault = this.fields.map(field => field);
        this.searchSimpleForm = this.formBuilder.group({
            filter: '',
            selectedFields: [this.selectedDefault],
            showAllVersions: [false]
        });
    }

    ngOnInit(): void {
        this.loadInitialData();
    }

    public onLoadOrganisationDetail(urn: string): void {
        this.dataDetail = new OrganisationResource(urn);
        this.apiService.getDetailFromSrm(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeService.getTextValue(data.description?.text));
            (this.dataDetail!.name = this.localeService.getTextValue(data.name?.text));
            this.detailForm.patchValue(this.dataDetail);
        });

        this.routerLinkDetail = this.dataDetail?.agency + '/' + this.dataDetail?.resourceId + '/'
            + this.dataDetail?.id + '/' + this.dataDetail?.version + '/detail';
    }

    protected getDataChildren(resources: Resource[]): Observable<TreeNode[]> {
        return this.apiService.findAllResourcesDetailsWithMaintainerAndSchemeFromSrm(resources, this.apiService.isLatestVersion);
    }
}
