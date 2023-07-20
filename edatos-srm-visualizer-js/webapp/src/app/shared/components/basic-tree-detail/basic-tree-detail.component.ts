import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { TableTreeComponent } from '../table-tree/table-tree.component';
import { DateUtils } from '../../utils/dateUtils';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-basic-tree-detail',
    templateUrl: './basic-tree-detail.component.html',
})
export abstract class BasicTreeDetailComponent implements OnInit {
    @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;

    public resource: any;

    detailForm: any;
    dataDetail: Resource | undefined;

    apiSDMX: boolean = false;
    showChildrenTree: boolean = false;

    isDataWithChildrenTree: boolean = true;
    dataChildrenLoaded: boolean = false;
    dataChildren: TreeNode[] = [];

    constructor(protected formBuilder: FormBuilder, protected apiService: ApiService, protected route: ActivatedRoute,
                protected localeService: LocaleService, protected translateService: TranslateService) {}

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
            lastUpdateDate: '',
            isRecommended: '',
        };

        this.apiService.getDetailFromStructureResource(this.dataDetail).subscribe((data) => {
            this.resource= data;
            this.mapperDataDetail(this.resource);
            this.loadAllVersionsFromResource();
            if (this.isDataWithChildrenTree) {
                this.loadChildrenTreeData();
            }
            // FIXME
            // } else {
            //   URL = this.apiChildrens
            //     .replace('{agencyID}', agency)
            //     .replace('{resourceID}', resourceId)
            //     .replace('{version}', Constants.LATEST);
            //   this.loadChildrenTableData(URL);
            // }
        });
    }

    public loadChildrenTreeData() {
        this.apiService.getChildrenTree(this.dataDetail!).subscribe((data) => {
            if (data) {
                this.updateTableChildrenTreeNode(data);
                this.dataChildrenLoaded = true;
            }
        });
    }

    public onDownloadSdmx() {
        this.apiService.getFile().subscribe((blob) => {
            const a = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = this.dataDetail!.id + '.xml';
            a.click();
            URL.revokeObjectURL(objectUrl);
        });
    }

    public onReturn() {
        window.history.back();
    }

    public mapperDataDetail(data: any): void {
        this.dataDetail = new Resource(data.urn);
        this.dataDetail!.description = this.localeService.getTextValue(data.description?.text);
        this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
        this.dataDetail!.annotations = this.localeService.getTextValue(data.annotations?.text);
        this.dataDetail!.lastUpdateDate = data.lifeCycle? DateUtils.formatSimpleDate(data.lifeCycle?.lastUpdatedDate) : '';
        this.dataDetail!.uri = data.uri;
        this.dataDetail!.isRecommended = data.isRecommended ?  this.translateService.instant('yes') : this.translateService.instant('no');
        this.detailForm.patchValue(this.dataDetail);
    }

    abstract loadAllVersionsFromResource(): void;
}
