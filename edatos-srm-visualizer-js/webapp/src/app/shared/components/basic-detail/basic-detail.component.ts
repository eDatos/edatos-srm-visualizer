import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiSrmService } from 'src/app/core/services/api/structural-resources/api-srm.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import { TranslateService } from '@ngx-translate/core';
import { Dropdown } from 'primeng/dropdown';
import { ApiSdmxService } from 'src/app/core/services/api/sdmx/api-sdmx.service';
import { FileDonwloadHelper } from 'src/app/core/services/helper/file-donwload-helper';
import { TableExpandableRows } from '../table/table-row-expand.component';


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

    detailForm: any;
    dataDetail: any | undefined;

    public expandedMenu: boolean = false;
    dataChildrenLoaded: boolean = false;
    dataChildren: TreeNode[] = [];

    protected fileDownloadHelper: FileDonwloadHelper;
    constructor(protected formBuilder: FormBuilder, protected apiSrmService: ApiSrmService, protected route: ActivatedRoute,
                protected localeService: LocaleService, protected translateService: TranslateService,
                protected apiSdmxService?: ApiSdmxService) {
        this.fileDownloadHelper = new FileDonwloadHelper(apiSdmxService, apiSrmService);
        this.items = [
            {
                label: this.translateService.instant('download.sdmx-xml'),
                icon: 'fa-thin fa-code',
                command: () => {
                    this.fileDownloadHelper.onDownloadSdmx(this.dataDetail);
                }
            },
            {
                label: this.translateService.instant('download.json'),
                icon: 'fa-thin fa-brackets-curly',
                command: () => {
                    this.fileDownloadHelper.onDownloadJson(this.dataDetail, 'json');
                }
            },
            {
                label: this.translateService.instant('download.csv'),
                icon: 'fa-thin fa-semicolon',
                command: () => {
                    this.fileDownloadHelper.onDownloadCsv(this.dataDetail, 'csv');
                }
            },
            {
                label: this.translateService.instant('download.xls'),
                icon: 'fa-thin fa-file-spreadsheet',
                command: () => {
                    this.fileDownloadHelper.onDownloadXLS(this.dataDetail, 'xls');                }
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
            this.loadDetailData();
        });
    }

    public loadChildrenTreeData() {
        this.apiSrmService.getChildrenTree(this.dataDetail!).subscribe((children) => {
            if (children) {
                this.tabletreenode.data = [];
                this.dataChildren = children;
                this.tabletreenode.treeControl.expandAll();
                this.dataChildrenLoaded = true;
            }
        });
    }
    
    public onReturn() {
        window.history.back();
    }

    public parseDesriptionToHtml(): string {
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

    protected abstract loadDetailData(): void;

}
