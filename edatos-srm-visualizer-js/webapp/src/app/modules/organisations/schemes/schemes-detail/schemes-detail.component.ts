import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';
import {
    OrganisationsSchemeApiService
} from 'src/app/core/services/api/structural-resources/organisations/organisations-scheme-api.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { DateUtils } from 'src/app/shared/utils/date-utils';
import { OrganisationResource } from 'src/app/shared/models/resources/organisation-resource.model';

@Component({
    selector: 'app-schemes-detail',
    templateUrl: './schemes-detail.component.html',
    styleUrls: ['./schemes-detail.component.scss']
})
export class SchemesDetailComponent extends BasicDetailComponent implements OnInit {

    public versions: any[] = [];
    public items: any[] = [];
    public selectedVersion: string = '';

    public navLinks: any[];
    public activeLink: string;
    public expandedMenu: boolean = false;

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

        this.items = [
            {
                label: this.translateService.instant('download.sdmx-xml'),
                icon: 'fa-thin fa-code'/*,
                command: () => {
                            this.onDownloadFileFormat('xml');
                }*/ //TODO: pendiente de tarea EDATOS-4143
            },
            {
                label: this.translateService.instant('download.json'),
                icon: 'fa-thin fa-brackets-curly'/*,
                command: () => {
                    this.onDownloadFileFormat('json');
                }*/
            },
            {
                label: this.translateService.instant('download.csv'),
                icon: 'fa-thin fa-semicolon'/*,
                command: () => {
                    this.onDownloadFileFormat('csv');
                }*/
            },
            {
                label: this.translateService.instant('download.xls'),
                icon: 'fa-thin fa-file-spreadsheet'/*,
                command: () => {
                    this.onDownloadFileFormat('xls');
                }*/
            }
        ];
        this.activeLink = this.navLinks[0].label;
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
        this.dataDetail!.publicationDate = data.validFrom ? DateUtils.formatSimpleDate(data.validFrom) : '';
        this.getDetailForm();
    }

    public loadAllVersionsFromResource(): void {
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

    handleVisibilityMenu(): boolean {
        this.expandedMenu = !this.expandedMenu;
        return this.expandedMenu;
    }

}

