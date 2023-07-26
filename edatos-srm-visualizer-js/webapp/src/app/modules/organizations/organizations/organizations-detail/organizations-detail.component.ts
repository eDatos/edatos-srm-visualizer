import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-tree-detail.component';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import {
    OrganizationsApiService
} from 'src/app/core/services/api/structural-resources/organizations/organizations-api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-organizations-detail',
    templateUrl: './organizations-detail.component.html',
    styleUrls: ['./organizations-detail.component.scss']
})
export class OrganizationsDetailComponent extends BasicTreeDetailComponent implements OnInit {
    constructor(protected override formBuilder: FormBuilder, protected override apiService: OrganizationsApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiService, route, localeService, translateService);
        this.showChildrenTree = true;
        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            agency: '',
            comments: ''
        });
    }

    public updateTableChildrenTreeNode(data: any): void {
        this.tabletreenode.data = [];
        this.tabletreenode.dataSource.data = data;
        this.tabletreenode.treeControl.expandAll();
    }

    onLoadDetail(element: string) {
        let resource = new Resource(element);
        this.router.navigate(['organizations', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }

    public loadAllVersionsFromResource(): void {}

    public mapperDataResourceDetail(data: any): void {
        this.dataDetail = new Resource(data.urn);
        this.dataDetail!.description = this.localeService.getTextValue(data.description?.text);
        this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
        this.dataDetail!.annotations = this.localeService.getTextValue(data.annotations?.text);
        this.dataDetail!.uri = data.uri;

        this.detailForm.patchValue(this.dataDetail);
    }

    loadDetailDataOnInit(): void {
    }
}
