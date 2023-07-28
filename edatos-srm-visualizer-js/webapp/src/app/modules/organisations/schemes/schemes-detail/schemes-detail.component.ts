import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import {
    OrganisationsSchemeApiService
} from 'src/app/core/services/api/structural-resources/organisations/organisations-scheme-api.service';
import { BasicTreeDetailComponent } from '../../../../shared/components/basic-tree-detail/basic-tree-detail.component';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { CategoryResource } from '../../../../shared/models/resources/category-resource.model';
import { DateUtils } from '../../../../shared/utils/dateUtils';
import { OrganisationResource } from '../../../../shared/models/resources/organisation-resource.model';

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

    constructor(protected override formBuilder: FormBuilder, protected override apiService: OrganisationsSchemeApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiService, route, localeService, translateService);

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            uri: '',
            description: '',
            version: '',
            agency: '',
            annotations: '',
            publicationDate: ''
        });

        this.navLinks = [
            {
                label: this.translateService.instant('organisations.organisationsOfScheme')
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

    loadDetailDataOnInit(): void {
    }

    mapperDataResourceDetail(data: any): void {
        this.dataDetail = new OrganisationResource(data.urn);
        this.dataDetail!.description = this.localeService.getTextValue(data.description?.text);
        this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
        this.dataDetail!.annotations = this.localeService.getTextValue(data.annotations?.text);
        console.log('data', data)
        this.dataDetail!.publicationDate = data.validFrom ? DateUtils.formatSimpleDate(data.validFrom) : '';
        this.dataDetail!.uri = data.selfLink?.href;
        this.dataDetail!.version = 'v' + this.dataDetail.version;

        this.detailForm.patchValue(this.dataDetail);
    }

    public loadAllVersionsFromResource(): void {
        this.apiService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
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

