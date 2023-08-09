import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoriesApiService } from 'src/app/core/services/api/structural-resources/categories/categories-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';

import { TranslateService } from '@ngx-translate/core';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-categories-search',
    templateUrl: './categories-search.component.html',
    styleUrls: ['./categories-search.component.scss']
})
export class CategoriesSearchComponent extends BasicSearchComponent implements OnInit {

    constructor(protected override formBuilder: FormBuilder, protected override apiService: CategoriesApiService,
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

    public onLoadCategoryDetail(urn: string): void {
        this.dataDetail = new CategoryResource(urn);
        this.apiService.getDetailFromSrm(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeService.getTextValue(data.description?.text));
            (this.dataDetail!.name = this.localeService.getTextValue(data.name?.text));
            this.detailForm.patchValue(this.dataDetail);
        });

        this.routerLinkDetail = `${this.dataDetail?.agency}/${this.dataDetail?.resourceId}/${this.dataDetail?.id}/${this.dataDetail?.version}/detail`;
    }

    protected getDataChildren(resources: Resource[]): Observable<TreeNode[]> {
        return this.apiService.findAllDetailsWithMaintainerAndSchemeFromSrm(resources, this.apiService.isLatestVersion);
    }
}
