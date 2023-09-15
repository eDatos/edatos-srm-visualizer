import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';

import {
    CategoriesSchemeApiService
} from 'src/app/core/services/api/structural-resources/categories/categories-scheme-api.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';

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

        this.items = [
            {
                label: this.translateService.instant('download.sdmx-xml'),
                icon: 'fa-thin fa-code'
            },
            {
                label: this.translateService.instant('download.json'),
                icon: 'fa-thin fa-brackets-curly'
            },
            {
                label: this.translateService.instant('download.csv'),
                icon: 'fa-thin fa-semicolon'
            },
            {
                label: this.translateService.instant('download.xls'),
                icon: 'fa-thin fa-file-spreadsheet'   
            }
        ];
    }

    protected loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadAllVersionsFromResource();
            this.loadChildrenTreeData();
        });
    }

    public onloadTreeNodeDetailData(urn: string) {
        let resource = new CategoryResource(urn);
        this.router.navigate(['categories', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }

    private loadDataDetailResource(data: any): Observable<CategoryResource> {
        return this.apiSrmService.getDataDetailCategorySchemeResourceFromSrm(data);
    }

    public override onReturn() {
        this.router.navigate(['schemes'], { relativeTo: this.route.parent });
    }

    private loadAllVersionsFromResource(): void {
        this.apiSrmService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            if (data) {
                data.forEach((version: any) => {
                    this.versions.push({ value: version });
                });
            }
        });
    }

    public onLoadDetailVersion(event: any) {
        this.versions = [];
        this.selectedVersion = event.value;
        this.router.navigate(['schemes', this.dataDetail!.agency, this.dataDetail!.resourceId, this.selectedVersion, 'detail'], { relativeTo: this.route.parent });
    }

    onActiveItemChange(link: any) {
        this.activeLink = link;
    }

}
