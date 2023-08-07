import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';

import {
    CategoriesSchemeApiService
} from 'src/app/core/services/api/structural-resources/categories/categories-scheme-api.service';
import { TranslateService } from '@ngx-translate/core';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { Resource } from '../../../../shared/models/resources/resource.model';

@Component({
    selector: 'app-schemes-search',
    templateUrl: './schemes-search.component.html',
    styleUrls: ['./schemes-search.component.scss'],
})
export class SchemesSearchComponent extends BasicSearchComponent implements OnInit {

    constructor(protected override formBuilder: FormBuilder, protected override apiService: CategoriesSchemeApiService,
                protected override translateService: TranslateService, protected override localeService: LocaleService) {
        super(apiService, formBuilder, translateService, localeService);

        this.searchForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
        });

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            scheme: '',
        });

        this.fields = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.description'), value: 'description' },
            { name: this.translateService.instant('resourceParameters.maintainer'), value: 'maintainer' }
        ];

        this.selectedDefault = this.fields.filter(opt=>opt.value !== 'description').map(field => field);
        this.searchSimpleForm = this.formBuilder.group({
            filter: '',
            selectedFields:  [this.selectedDefault],
            showAllVersions: [false],
        });
    }
    ngOnInit(): void {
        this.loadInitialData();
    }

    public onLoadCategorySchemeDetail(urn: string): void {
        this.dataDetail = new CategoryResource(urn);
        this.apiService.getDetailFromSrm(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeService ? this.localeService.getTextValue(data.description?.text) : ' ');
            (this.dataDetail!.name = this.localeService ? this.localeService.getTextValue(data.name?.text) : ' ');
            this.detailForm.patchValue(this.dataDetail);
        });

        this.routerLinkDetail = this.dataDetail?.agency + '/' + this.dataDetail?.resourceId + '/'
            +  this.dataDetail?.version + '/detail';
    }

    public mapResourceToDetail(resourceToTreeNode: TreeNode, resource: Resource, maintainer: any): void {
        resourceToTreeNode.id = resource.id + '(' + resource.version + ')'
    }
}
