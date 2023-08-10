import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    CodelistCodesApiService
} from 'src/app/core/services/api/structural-resources/codelist/codelist-codes-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { TranslateService } from '@ngx-translate/core';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { Resource } from 'src/app/shared/models/resources/resource.model';

@Component({
    selector: 'app-code-search',
    templateUrl: './code-search.component.html',
    styleUrls: ['./code-search.component.scss']
})
export class CodeSearchComponent extends BasicSearchComponent implements OnInit {
    constructor(protected override formBuilder: FormBuilder, protected override apiService: CodelistCodesApiService,
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
            { name: this.translateService.instant('resourceParameters.description'), value: 'description' },
            { name: this.translateService.instant('resourceParameters.codelist'), value: 'scheme' }
        ];

        this.selectedDefault = this.fields.filter(opt => opt.value !== 'description').map(a => a);

        this.searchSimpleForm = this.formBuilder.group({
            filter: '',
            selectedFields: [this.selectedDefault],
            showAllVersions: [false]
        });

    }

    ngOnInit(): void {
        this.loadInitialData();
    }

    public onLoadCodeDetail(urn: string): void {
        this.dataDetail = new CodelistResource(urn);
        this.apiService.getDetailFromSrm(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeService.getTextValue(data.description?.text) );
            (this.dataDetail!.name = this.localeService.getTextValue(data.name?.text) );
            this.detailForm.patchValue(this.dataDetail);
        });

        this.routerLinkDetail = this.dataDetail?.agency + '/' + this.dataDetail?.resourceId + '/' +
            this.dataDetail?.id + '/' + this.dataDetail?.version + '/' + 'detail';
    }

    public mapResourceToDetail(resourceToTreeNode: TreeNode, resource: Resource, maintainer: any): void {
        if(!this.apiService.isLatestVersion) {
            resourceToTreeNode.scheme = `${resource.id}(${resource.version}) / ${resourceToTreeNode.maintainer}`;
        } else {
            resourceToTreeNode.scheme = `${resource.id} / ${resourceToTreeNode.maintainer}`;
        }
    }
}
