import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import {
    OrganisationsApiService
} from 'src/app/core/services/api/structural-resources/organisations/organisations-api.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { OrganisationResource } from 'src/app/shared/models/resources/organisation-resource.model';
import { BasicDetailComponent } from '../../../../shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-organisations-detail',
    templateUrl: './organisations-detail.component.html',
    styleUrls: ['./organisations-detail.component.scss']
})
export class OrganisationsDetailComponent extends BasicDetailComponent implements OnInit {

    public navLinks: MenuItem[];
    public activeLink: MenuItem;
    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: OrganisationsApiService,
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
            organisationScheme: '',
            maintainer: ''
        });

        this.navLinks = [
            {
                label: this.translateService.instant('organisations.otherOrganisationsOfScheme')
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

    private loadDataDetailResource(data: any): Observable<OrganisationResource> {
        return this.apiSrmService.getDataDetailOrganisationResourceFromSrm(data);
    }


    onLoadDetail(element: string) {
        let resource = new Resource(element);
        this.router.navigate(['organisations', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }


    onActiveItemChange(link: any) {
        this.activeLink = link;
    }

}
