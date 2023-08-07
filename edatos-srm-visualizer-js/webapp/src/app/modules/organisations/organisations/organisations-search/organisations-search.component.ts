import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import {
    OrganisationsApiService
} from 'src/app/core/services/api/structural-resources/organisations/organisations-api.service';
import { TranslateService } from '@ngx-translate/core';
import {
    OrganisationResource
} from 'src/app/shared/models/resources/organisation-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { Resource } from '../../../../shared/models/resources/resource.model';

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
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.scheme'), value: 'scheme' }
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
            (this.dataDetail!.description = this.localeService ? this.localeService.getTextValue(data.description?.text) : ' ');
            (this.dataDetail!.name = this.localeService ? this.localeService.getTextValue(data.name?.text) : ' ');
            this.detailForm.patchValue(this.dataDetail);
        });

        this.routerLinkDetail = this.dataDetail?.agency + '/' + this.dataDetail?.resourceId + '/'
            + this.dataDetail?.id + '/' + this.dataDetail?.version + '/detail';
    }

    public mapResourceToDetail(resourceToTreeNode: TreeNode, resource: Resource, maintainer: any): void {
        this.apiService.getDetailSchemeFromSrm(resource).subscribe((scheme) => {
            let nameScheme = this.localeService ? this.localeService?.getTextValue(scheme.name.text) : '';
            resourceToTreeNode.scheme = scheme.id + '(' + scheme.version + ') - ' + nameScheme;
        });
    }
}
