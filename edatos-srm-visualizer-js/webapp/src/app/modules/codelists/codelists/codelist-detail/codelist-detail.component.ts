import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodelistsApiService } from 'src/app/core/services/api/structural-resources/codelist/codelists-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-tree-detail.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { DateUtils } from 'src/app/shared/utils/dateUtils';


@Component({
    selector: 'app-codelist-detail',
    templateUrl: './codelist-detail.component.html',
    styleUrls: ['./codelist-detail.component.scss']
})
export class CodelistDetailComponent extends BasicTreeDetailComponent implements OnInit {
    public versions: any[] = [];
    public items: any[] = [];
    public relatedCodelists: CodelistResource[] = [];
    public selectedVersion: string = '';
    public navLinks: MenuItem[];
    public activeLink: MenuItem;
    public expandedMenu: boolean = false;

    constructor(protected override formBuilder: FormBuilder, protected override apiService: CodelistsApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiService, route, localeService, translateService);
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            agency: '',
            annotations: '',
            uri: '',
            lastUpdatedDate: '',
            isRecommended: ''
        });

        this.navLinks = [
            {
                label: this.translateService.instant('codelists.codes')
            }, {
                label: this.translateService.instant('codelists.relatedCodelist')
            }
        ];
        this.activeLink = this.navLinks[0];

        this.items= [
            {
                label: this.translateService.instant('download.sdmx-xml'),
                icon: 'fa-thin fa-code',
                command: () => {
                            this.onDownloadFileFormat('xml');
                }
            },
            {
                label: this.translateService.instant('download.json'),
                icon: 'fa-thin fa-brackets-curly',
                command: () => {
                    this.onDownloadFileFormat('json');
                }
            },
            {
                label: this.translateService.instant('download.csv'),
                icon: 'fa-thin fa-semicolon',
                command: () => {
                    this.onDownloadFileFormat('csv');
                }
            },
            {
                label: this.translateService.instant('download.xls'),
                icon: 'fa-thin fa-file-spreadsheet',
                command: () => {
                    this.onDownloadFileFormat('xls');
                }
            }
        ];
        
    }

    public showCodeInformation() {
        this.router.navigate(['./code'], { relativeTo: this.route }).then(r => {
        });
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

    onActiveItemChange(event: any) {
        this.activeLink = event;
        if(this.activeLink == this.navLinks[1]){
            this.apiService.loadRelatedCodelist(this.resource.variable.urn).subscribe((data) => {
                if (data[this.apiService.apiSearchDataPath]) {
                    data[this.apiService.apiSearchDataPath].forEach((codelist: any) => {
                        const resource = new CodelistResource(codelist.urn);
                        resource.id = codelist.id;
                        resource.name = this.localeService.getTextValue(codelist.name?.text);
                        resource.description = this.localeService.getTextValue(codelist.description?.text);
                        this.relatedCodelists.push(resource);
                    });
                    this.dataChildrenLoaded = true;
                }
            });
        }
        else {
            this.relatedCodelists = [];
        }
    }

    public loadAllVersionsFromResource() {
        this.apiService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            if (data) {
                data.forEach((version: any) => {
                    this.versions.push({value: version});
                });
            }
        });
    }

    public onLoadDetailVersion(event: any) {
        this.versions = [];
        this.selectedVersion = event.value;
        this.router.navigate(['codelists', this.dataDetail!.agency, this.dataDetail!.resourceId, this.selectedVersion, 'detail'], { relativeTo: this.route.parent });
    }


    public parseDesriptionToHtml(): string {
        return this.detailForm.get('description')?.value || '';
    }

    public mapperDataResourceDetail(data: any): void {
        this.dataDetail = new CodelistResource(data.urn);
        this.dataDetail!.description = this.localeService.getTextValue(data.description?.text);
        this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
        this.dataDetail!.annotations = this.localeService.getTextValue(data.annotations?.text);
        this.dataDetail!.lastUpdatedDate = data.lifeCycle? DateUtils.formatSimpleDate(data.lifeCycle?.lastUpdatedDate) : '';
        this.dataDetail!.uri = data.uri;
        this.dataDetail!.isRecommended = data.isRecommended ?  this.translateService.instant('yes') : this.translateService.instant('no');

        this.detailForm.patchValue(this.dataDetail);
    }

    loadDetailDataOnInit(): void {}

    handleVisibilityMenu(): boolean {
        this.expandedMenu = !this.expandedMenu;
        return this.expandedMenu;
    }
}
