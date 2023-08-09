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

    showChildrenTree: boolean = false;

    isDataWithChildrenTree: boolean = true;
    dataChildrenLoaded: boolean = false;
    dataChildren: TreeNode[] = [];

    protected isMapperWithMaintainer: boolean = true;

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

    public abstract updateTableChildrenTreeNode(data: any): void;

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.loadDetailData();
        });
    }

    public loadDetailData() {
        this.dataDetail = {
            id: this.route.snapshot.paramMap.get('id')!,
            resourceId: this.route.snapshot.paramMap.get('resourceID')!,
            version: this.route.snapshot.paramMap.get('version')!,
            agency: this.route.snapshot.paramMap.get('agencyID')!,
            description: '',
            name: '',
            urn: '',
            annotations: '',
            uri: '',
        };

        this.apiSrmService.getDetailFromSrm(this.dataDetail).subscribe((data) => {
            this.resource = data;
            this.mapperDataResourceDetail(this.resource);
            this.loadAllVersionsFromResource();
            this.loadDetailDataOnInit();
            if (this.isDataWithChildrenTree) {
                this.loadChildrenTreeData();
            }
        });
    }

    public loadChildrenTreeData() {
        this.apiSrmService.getChildrenTree(this.dataDetail!).subscribe((data) => {
            if (data) {
                this.updateTableChildrenTreeNode(data);
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

    protected getDetailForm() {
        if(this.isMapperWithMaintainer) {
            this.apiSrmService.getDetailManteinerFromSrm(this.dataDetail.agency).subscribe((maintainer) => {
                let nameMaintainer = this.localeService.getTextValue(maintainer.name.text);
                this.dataDetail!.description = this.localeService.getTextValue(this.resource.description?.text);
                this.dataDetail!.name = this.localeService.getTextValue(this.resource.name?.text);
                this.dataDetail!.annotations = this.localeService.getTextValue(this.resource.annotations?.text);
                this.dataDetail!.uri = this.resource.selfLink?.href;
                this.dataDetail!.maintainer = maintainer.id + ' - ' + nameMaintainer;
                this.dataDetail!.version = 'v' + this.dataDetail.version;

                this.detailForm.patchValue(this.dataDetail);
            });
        } else {
            this.dataDetail!.name = this.localeService.getTextValue(this.resource.name?.text);
            this.dataDetail!.uri = this.resource.selfLink?.href;

            this.detailForm.patchValue(this.dataDetail);
        }
    }

    abstract loadDetailDataOnInit(): void;

    abstract mapperDataResourceDetail(data: any): void;

    abstract loadAllVersionsFromResource(): void;
}
