import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import { TranslateService } from '@ngx-translate/core';
import { Dropdown } from 'primeng/dropdown';
import { ApiSdmxService } from 'src/app/core/services/api/sdmx/api-sdmx.service';
import { FileDonwloadHelper } from 'src/app/core/services/helper/file-donwload-helper';
import { TableExpandableRows } from '../table/table-row-expand.component';
import { OrganisationResource } from '../../models/resources/organisation-resource.model';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';


@Component({
    selector: 'app-basic-detail',
    templateUrl: './basic-detail.component.html'
})
export abstract class BasicDetailComponent implements OnInit {
    @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;
    @ViewChild('searchResults') searchResults: ElementRef | undefined;
    @ViewChild('select') select!: Dropdown;
    @ViewChild('tableExpandable') tableExpandable!: TableExpandableRows;

    public items: any[] = [];

    public resource: any;

    public copiedUri: boolean = false;
    public copiedUrn: boolean = false;

    detailForm: any;
    dataDetail: any | undefined;

    public expandedMenu: boolean = false;
    public dataChildrenLoaded: boolean = false;
    public dataChildren: TreeNode[] = [];

    public searchConfig: SearchConfig = {
        resultLimit: 25,
        resultOffset: 0,
        resultSize: 0,
        currentPage: 0,
        orderColumn: "",
        sortOrder: ""
    };

    protected fileDownloadHelper: FileDonwloadHelper;
    constructor(protected formBuilder: FormBuilder, protected apiSrmService: ApiSrmService, protected route: ActivatedRoute,
                protected localeService: LocaleService, protected translateService: TranslateService, protected router: Router,
                protected apiSdmxService?: ApiSdmxService) {
        this.fileDownloadHelper = new FileDonwloadHelper(apiSdmxService, apiSrmService);
        this.items = [
            {
                label: this.translateService.instant('download.sdmx-xml'),
                icon: 'fa-thin fa-code-simple',
                command: () => {
                    this.fileDownloadHelper.onDownloadSdmx(this.dataDetail);
                }
            },
            {
                label: this.translateService.instant('download.json'),
                icon: 'fa-thin fa-brackets-curly',
                command: () => {
                    this.fileDownloadHelper.onDownloadJson(this.dataDetail);
                }
            },
            {
                label: this.translateService.instant('download.csv'),
                icon: 'fa-thin fa-file-spreadsheet',
                command: () => {
                    this.fileDownloadHelper.onDownloadCsv(this.dataDetail);
                }
            },
            {
                label: this.translateService.instant('download.xlsx'),
                icon: 'fa-thin fa-file-excel',
                command: () => {
                    this.fileDownloadHelper.onDownloadXLSX(this.dataDetail);                
                }
            }
        ];
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.dataDetail = {
                id: this.route.snapshot.paramMap.get('id')!,
                resourceId: this.route.snapshot.paramMap.get('resourceID')!,
                version: this.route.snapshot.paramMap.get('version')!,
                agency: this.route.snapshot.paramMap.get('agencyID')!,
                description: '',
                name: '',
                urn: this.route.snapshot.paramMap.get('urn')!,
                annotations: '',
                uri: '',
            };
            this.loadDetailData(true);
        });
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
                if (this.tableExpandable?.expandedElements.length > 0) {
                    this.tableExpandable.expandedElements = [];
                }
            }
        });
    }

    public loadChildrenTreeData() {
        this.apiSrmService.getChildrenTree(this.dataDetail!, this.translateService.currentLang).subscribe((children) => {
            if (children.length > 0) {
                this.tabletreenode.data = [];
                this.dataChildren = children;
                this.tabletreenode.treeControl.expandAll();
                this.tabletreenode.dataLoaded = true;
            } else if (children.length === 0) {
                this.tabletreenode.dataLoaded = true;
            }
        });
    }

    public parseDescriptionToHtml(): string {
        return this.detailForm.get('description')?.value || '';
    }

    public handleOnPanelShow() {
        this.select.dropdownIcon = 'fa-solid fa-chevron-up';
    }

    public handleOnPanelHide() {
        this.select.dropdownIcon = 'fa-thin fa-chevron-down';
    }

    public handleVisibilityMenu(): boolean {
        this.expandedMenu = !this.expandedMenu;
        return this.expandedMenu;
    }

    public openSelfLink(selfLink: string) {
        window.open(selfLink, '_blank');
    }

    public onCopyUriSuccess() {
        this.copiedUri = true;
        setTimeout(() => {
            this.copiedUri = false;
        }, 3000);
    }

    public onCopyUrnSuccess() {
        this.copiedUrn = true;
        setTimeout(() => {
            this.copiedUrn = false;
        }, 3000);
    }

    public openMaintainerLink(agency: string) {
        const urn = `urn:sdmx:org.sdmx.infomodel.base.Agency=SDMX:AGENCIES(1.0).${agency}`;
        const resource = new OrganisationResource(urn);
        this.router.navigate(['organisations/organisations', resource.agency, resource.resourceId, resource.id, resource.version, 'detail']);
    }


    protected defaultParametersSearch(): void {
        this.searchConfig.currentPage = 0;
        this.searchConfig.resultOffset = 0;
        this.searchConfig.resultSize = 0;
    }

    protected abstract loadDetailData(loadAll?: boolean): void;

    protected abstract onReturn(): void;

    public onChangePage(page: number): void {
        this.searchConfig.currentPage = page;
        this.searchConfig.resultOffset = page * this.searchConfig.resultLimit;
        this.loadDetailData(false);
        if (this.searchResults) {
            this.searchResults.nativeElement.scrollTop = 0;
        }
    }
}
