import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { SearchConfig } from 'src/app/shared/models/search-config';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';

@Component({
    selector: 'app-basic-tree-detail',
    templateUrl: './basic-tree-detail.component.html',
})
export abstract class BasicTreeDetailComponent implements OnInit {
    searchConfig: SearchConfig = {
        resultLimit: 20,
        resultOffset: 0,
        resultSize: 0,
        currentPage: 0,
    };

    detailForm: any;
    dataDetail: Resource | undefined;

    apiSDMX: boolean = false;
    showChildrensTree: boolean = false;

    isDataWithChildrensTree: boolean = true;
    dataChildrensLoaded: boolean = false;
    dataChildrens: TreeNode[] = [];

    constructor(public formBuilder: FormBuilder, public apiService: ApiService, public route: ActivatedRoute, public localeService: LocaleService) {}

    public abstract updateTableChildrensTreeNode(data: any): void;

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
        };

        this.apiService.getDetailFromStructureResource(this.dataDetail).subscribe((data) => {
            this.updateDataDetail(data);
            if (this.isDataWithChildrensTree) {
                this.loadChildrensTreeData();
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

    public loadChildrensTreeData() {
        this.apiService.getChildrensTree(this.dataDetail!).subscribe((data) => {
            if (data) {
                this.updateTableChildrensTreeNode(data);
                this.dataChildrensLoaded = true;
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

    public updateDataDetail(data: any): void {
        this.dataDetail = new Resource(data.urn);
        this.dataDetail!.description = this.localeService.getTextValue(data.description?.text);
        this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
        this.detailForm.patchValue(this.dataDetail);
    }
}
