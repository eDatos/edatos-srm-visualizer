import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesApiService } from 'src/app/core/services/api/structural-resources/categories/categories-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { BasicDetailComponent } from '../../../../shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';

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


    protected loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadChildrenTreeData();
        });
    }

    private loadDataDetailResource(data: any): Observable<CategoryResource> {
        return this.apiSrmService.getDataDetailCategoryResourceFromSrm(data);
    }

    onActiveItemChange(event: any) {
        this.activeLink = event;
    }

}
