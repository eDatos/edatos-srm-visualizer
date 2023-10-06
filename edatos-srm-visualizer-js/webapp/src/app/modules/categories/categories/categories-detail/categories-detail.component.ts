import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesApiService } from 'src/app/core/services/api/structural-resources/categories/categories-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CategoryResource } from 'src/app/shared/models/resources/category-resource.model';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';
import { ConceptResource } from '../../../../shared/models/resources/concept-resource.model';

@Component({
    selector: 'app-categories-detail',
    templateUrl: './categories-detail.component.html',
    styleUrls: ['./categories-detail.component.scss']
})
export class CategoriesDetailComponent extends BasicDetailComponent implements OnInit {

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: CategoriesApiService,
                protected override route: ActivatedRoute, protected override router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiSrmService, route, localeService, translateService, router);
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

    public override onReturn() {
        this.router.navigate(['categories'], { relativeTo: this.route.parent });
    }
    public onloadTreeNodeDetailData(urn: string) {
        const resource = new CategoryResource(urn);
        this.router.navigate(['categories', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }

    private loadDataDetailResource(data: any): Observable<CategoryResource> {
        return this.apiSrmService.getDataDetailCategoryResourceFromSrm(data);
    }

    public openCategorySchemeLink(urn: string) {
        const resource = new ConceptResource(urn);
        this.router.navigate(['schemes', resource.agency, resource.resourceId, resource.version, 'detail'], { relativeTo: this.route.parent });
    }

    onActiveItemChange(link: any) {
        this.activeLink = link;
    }

}
