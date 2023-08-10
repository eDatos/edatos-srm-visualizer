import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-detail.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import {
    OrganisationsApiService
} from 'src/app/core/services/api/structural-resources/organisations/organisations-api.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { OrganisationResource } from 'src/app/shared/models/resources/organisation-resource.model';

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
        this.showChildrenTree = true;
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

    public updateTableChildrenTreeNode(data: any): void {
        this.tabletreenode.data = [];
        this.dataChildren = data;
        this.tabletreenode.treeControl.expandAll();
    }

    onLoadDetail(element: string) {
        let resource = new Resource(element);
        this.router.navigate(['organisations', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }

    public loadAllVersionsFromResource(): void {}

    public mapperDataResourceDetail(data: any): void {
        this.dataDetail = new OrganisationResource(data.urn);
        this.apiSrmService.getDetailSchemeFromSrm(this.dataDetail).subscribe((scheme) => {
            let nameScheme = this.localeService.getTextValue(scheme.name.text);
            this.dataDetail!.organisationScheme = scheme.id + ' (' + nameScheme + ')';
            this.getDetailForm();
        });
    }

    onActiveItemChange(link: any) {
        this.activeLink = link;
    }

    loadDetailDataOnInit(): void {}
}
