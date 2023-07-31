import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { TableTreeComponent } from '../table-tree/table-tree.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-basic-tree-detail',
    templateUrl: './basic-tree-detail.component.html',
})
export abstract class BasicTreeDetailComponent implements OnInit {
    @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;

    public resource: any;

    detailForm: any;
    dataDetail: any | undefined;

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
        };

        this.apiService.getDetailFromStructureResource(this.dataDetail).subscribe((data) => {
            this.resource= data;
            this.mapperDataResourceDetail(this.resource);
            this.loadAllVersionsFromResource();
            this.loadDetailDataOnInit();
            if (this.isDataWithChildrenTree) {
                this.loadChildrenTreeData();
            }
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

    abstract loadDetailDataOnInit(): void;
    abstract mapperDataResourceDetail(data: any): void;
    abstract loadAllVersionsFromResource(): void;
}
