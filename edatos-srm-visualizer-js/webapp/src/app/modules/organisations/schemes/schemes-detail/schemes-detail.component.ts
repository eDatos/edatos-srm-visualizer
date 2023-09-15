import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';
import {
    OrganisationsSchemeApiService
} from 'src/app/core/services/api/structural-resources/organisations/organisations-scheme-api.service';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { OrganisationResource } from 'src/app/shared/models/resources/organisation-resource.model';
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

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: OrganisationsSchemeApiService,
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
                label: this.translateService.instant('organisations.organisationsOfScheme')
            }
        ];

        this.activeLink = this.navLinks[0];
    }

    protected loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadAllVersionsFromResource();
            this.loadChildrenTreeData();
        });
    }

    private loadDataDetailResource(data: any): Observable<OrganisationResource> {
        return this.apiSrmService.getDataDetailOrganisationSchemeResourceFromSrm(data);
    }

    private loadAllVersionsFromResource(): void {
        this.apiSrmService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            if (data) {
                data.forEach((version: any) => {
                    this.versions.push({ value: version });
                });
                this.versions.reverse();
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

    public onloadTreeNodeDetailData(urn: string) {
        let resource = new OrganisationResource(urn);
        this.router.navigate(['organisations', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }

    public override onReturn() {
        this.router.navigate(['schemes'], { relativeTo: this.route.parent });
    }
}

