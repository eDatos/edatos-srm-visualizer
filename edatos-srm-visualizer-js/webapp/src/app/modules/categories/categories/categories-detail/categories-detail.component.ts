import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesApiService } from 'src/app/core/services/api/structural-resources/categories/categories-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';

@Component({
    selector: 'app-categories-detail',
    templateUrl: './categories-detail.component.html',
    styleUrls: ['./categories-detail.component.scss']
})
export class CategoriesDetailComponent extends BasicDetailComponent implements OnInit {

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: CategoriesApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiSrmService, route, localeService, translateService);
        this.showChildrenTree = true;
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            uri: '',
            agency: '',
            annotations: '',
            categoryScheme: '',
            maintainer: ''
        });

        this.navLinks = [
            {
                label: this.translateService.instant('category.otherCategoriesScheme')
            }
        ];
        this.activeLink = this.navLinks[0];
    }

    public updateTableChildrenTreeNode(data: any): void {
        this.tabletreenode.data = [];
        this.dataChildren = data;
        this.tabletreenode.treeControl.expandAll();
    }

    public loadAllVersionsFromResource(): void {
    }

    public mapperDataResourceDetail(data: any): void {
        this.dataDetail = new CategoryResource(data.urn);
        this.apiSrmService.getDetailSchemeFromSrm(this.dataDetail).subscribe((scheme) => {
            let nameScheme = this.localeService.getTextValue(scheme.name.text);
            this.dataDetail!.categoryScheme = scheme.id + ' (' + nameScheme + ')';
            this.getDetailForm();
        });
    }

    onActiveItemChange(event: any) {
        this.activeLink = event;
    }

    loadDetailDataOnInit(): void {
    }
}
