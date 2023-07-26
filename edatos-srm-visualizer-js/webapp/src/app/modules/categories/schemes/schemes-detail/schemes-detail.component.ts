import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';

import {
    CategoriesSchemeApiService
} from 'src/app/core/services/api/structural-resources/categories/categories-scheme-api.service';
import { BasicTreeDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-tree-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { DateUtils } from 'src/app/shared/utils/dateUtils';

@Component({
    selector: 'app-schemes-detail',
    templateUrl: './schemes-detail.component.html',
    styleUrls: ['./schemes-detail.component.scss'],
})
export class SchemesDetailComponent extends BasicTreeDetailComponent implements OnInit {
    public versions: any[] = [];
    public selectedVersion: string = '';

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    constructor(protected override formBuilder: FormBuilder, protected override apiService: CategoriesSchemeApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiService, route, localeService, translateService);
        this.showChildrenTree = true;
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            uri: '',
            description: '',
            version: '',
            agency: '',
            annotations: '',
            publicationDate: '',
        });

        this.navLinks = [
            {
                label: this.translateService.instant('category.categories')
            }
        ];
        this.activeLink = this.navLinks[0];
    }

    public parseDesriptionToHtml(): string {
        return this.detailForm.get('description')?.value || '';
    }

    public updateTableChildrenTreeNode(data: any): void {
        this.tabletreenode.data = [];
        this.dataChildren = data;
        this.tabletreenode.treeControl.expandAll();
    }
    loadDetailDataOnInit(): void {}
    mapperDataResourceDetail(data: any): void {
        this.dataDetail = new CategoryResource(data.urn);
        this.dataDetail!.description = this.localeService.getTextValue(data.description?.text);
        this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
        this.dataDetail!.annotations = this.localeService.getTextValue(data.annotations?.text);
        this.dataDetail!.publicationDate = DateUtils.formatSimpleDate(data.validFrom);
        this.dataDetail!.uri = data.selfLink?.href;
        this.dataDetail!.version = 'v' + this.dataDetail.version;

        this.detailForm.patchValue(this.dataDetail);
    }
    loadAllVersionsFromResource(): void {
        this.apiService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            if (data) {
                data.filter((version: any) => version !== this.dataDetail!.version).reverse().forEach((version: any) => {
                    this.versions.push({value: version});
                });
            }
        });
    }

    public onLoadDetailVersion(version: string) {
        this.router.navigate(['schemes', this.dataDetail!.agency, this.dataDetail!.resourceId, version, 'detail'], { relativeTo: this.route.parent });
        this.versions = [];
    }

    onActiveItemChange(event: any) {
        this.activeLink = event;
    }

}
