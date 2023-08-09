import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodelistsApiService } from 'src/app/core/services/api/structural-resources/codelist/codelists-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-detail.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { TranslateService } from '@ngx-translate/core';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { DateUtils } from 'src/app/shared/utils/date-utils';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { CodelistApiSdmxService } from 'src/app/core/services/api/sdmx/codelist/codelist-api-sdmx.service';


@Component({
    selector: 'app-codelist-detail',
    templateUrl: './codelist-detail.component.html',
    styleUrls: ['./codelist-detail.component.scss']
})
export class CodelistDetailComponent extends BasicDetailComponent implements OnInit {
    public versions: any[] = [];
    public relatedCodelists: CodelistResource[] = [];
    public selectedVersion: string = '';
    public navLinks: any[];
    public activeLink: string;
    public expandedMenu: boolean = false;

    public routerLinkDetail: string = '';
    public columns: any[];
    public dataChildrenTable: TreeNode[] = [];

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: CodelistsApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService,
                protected override apiSdmxService: CodelistApiSdmxService) {
        super(formBuilder, apiSrmService, route, localeService, translateService, apiSdmxService);

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            agency: '',
            annotations: '',
            uri: '',
            publicationDate: '',
            isRecommended: '',
            maintainer: ''
        });

        this.navLinks = [
            {
                label: this.translateService.instant('codelists.codes')
            }, {
                label: this.translateService.instant('codelists.relatedCodelist')
            }
        ];

        this.activeLink = this.navLinks[0].label? this.navLinks[0].label : '';

        this.columns = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.description'), value: 'description' }
        ];

    }

    updateTableChildrenTreeNode(data: any): void {
        this.tabletreenode.data = [];
        this.dataChildren = data;
        this.tabletreenode.treeControl.expandAll();
    }

    onLoadDetail(element: string) {
        let resource = new Resource(element);
        this.router.navigate(['codelists', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }

    onActiveItemChange(link: any) {
        this.activeLink = link;
        if (this.activeLink == this.navLinks[1].label) {
            this.apiSrmService.getRelatedCodelist(this.resource.variable.urn).subscribe((data) => {
                if (data[this.apiSrmService.apiSearchDataPath]) {
                    data[this.apiSrmService.apiSearchDataPath].forEach((codelist: any) => {
                        const resource = new CodelistResource(codelist.urn);
                        let scheme = codelist.urn.split(':')[3] ? codelist.urn.split(':')[3].split('(')[0] : '';
                        const resourceToTreeNode: TreeNode = {
                            name: this.localeService.getTextValue(codelist.name?.text),
                            id: resource.id,
                            urn: codelist.urn,
                            description: this.localeService.getTextValue(codelist.description?.text),
                            selfLink: codelist.selfLink.href,
                            maintainer: codelist.agencyID,
                            scheme: scheme,
                        };

                        this.dataChildrenTable = [...this.dataChildrenTable, resourceToTreeNode];
                    });
                    this.dataChildrenLoaded = true;
                }
            });
        } else {
            this.relatedCodelists = [];
        }
    }

    public loadAllVersionsFromResource() {
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
        this.router.navigate(['codelists', this.dataDetail!.agency, this.dataDetail!.resourceId, this.selectedVersion, 'detail'], { relativeTo: this.route.parent });
    }

    public mapperDataResourceDetail(data: any): void {
        this.dataDetail = new CodelistResource(data.urn);
        this.dataDetail!.publicationDate = this.resource.lifeCycle ? DateUtils.formatSimpleDate(this.resource.lifeCycle?.lastUpdatedDate) : '';
        this.dataDetail!.isRecommended = this.resource.isRecommended ? this.translateService.instant('yes') : this.translateService.instant('no');
        this.getDetailForm();
    }

    loadDetailDataOnInit(): void {
        this.activeLink = this.navLinks[0].label;
    }

    handleVisibilityMenu(): boolean {
        this.expandedMenu = !this.expandedMenu;
        return this.expandedMenu;
    }

    public onLoadCodelistDetail(urn: string): void {
        this.dataDetail = new CodelistResource(urn);
        if (this.dataDetail) {
            this.routerLinkDetail = '/codelists/codelists/' + this.dataDetail.agency + '/' + this.dataDetail.resourceId + '/' +  this.dataDetail.version + '/detail';
        }
    }
}
