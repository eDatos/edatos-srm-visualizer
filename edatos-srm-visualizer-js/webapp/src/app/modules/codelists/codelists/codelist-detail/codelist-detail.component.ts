import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodelistsApiService } from 'src/app/core/services/api/structural-resources/codelist/codelists-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { BasicTreeDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-tree-detail.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';

@Component({
    selector: 'app-codelist-detail',
    templateUrl: './codelist-detail.component.html',
    styleUrls: ['./codelist-detail.component.scss'],
})
export class CodelistDetailComponent extends BasicTreeDetailComponent implements OnInit {
    @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;
    constructor(formBuilder: FormBuilder, apiService: CodelistsApiService, route: ActivatedRoute, private router: Router, localeService: LocaleService) {
        super(formBuilder, apiService, route, localeService);
        this.showChildrenTree = true;
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            agency: '',
            comments: '',
        });
    }

    public updateTableChildrenTreeNode(data: any): void {
        this.tabletreenode.data = [];
        this.tabletreenode.dataSource.data = data;
        this.tabletreenode.treeControl.expandAll();
    }
    onLoadDetail(element: string) {
        let resource = new Resource(element);
        this.router.navigate(['codelists', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }
}
