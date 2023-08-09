import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';

import {
    CategoriesSchemeApiService
} from 'src/app/core/services/api/structural-resources/categories/categories-scheme-api.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { DateUtils } from 'src/app/shared/utils/date-utils';

@Component({
    selector: 'app-schemes-detail',
    templateUrl: './schemes-detail.component.html',
    styleUrls: ['./schemes-detail.component.scss']
})
export class SchemesDetailComponent extends BasicDetailComponent implements OnInit {
    public versions: any[] = [];
    public selectedVersion: string = '';

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: CategoriesSchemeApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiSrmService, route, localeService, translateService);
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
            maintainer: ''
        });

        this.navLinks = [
            {
                label: this.translateService.instant('category.categories')
            }
        ];
        this.activeLink = this.navLinks[0];
    }

    public updateTableChildrenTreeNode(data: any): void {
        this.tabletreenode.data = [];
        this.dataChildren = data;
        this.tabletreenode.treeControl.expandAll();
    }

    loadDetailDataOnInit(): void {
    }

    mapperDataResourceDetail(data: any): void {
        this.dataDetail = new CategoryResource(data.urn);
        this.dataDetail!.publicationDate = data.validFrom ? DateUtils.formatSimpleDate(data.validFrom) : '';
        this.getDetailForm();
    }

    public loadAllVersionsFromResource(): void {
        this.apiSrmService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            if (data) {
                data.forEach((version: any) => {
                    this.versions.push({ value: version });
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
