import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodelistsApiService } from 'src/app/core/services/api/structural-resources/codelist/codelists-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeDetailComponent } from '../../../../shared/components/basic-tree-detail/basic-tree-detail.component';
import { Resource } from '../../../../shared/models/resources/resource.model';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-codelist-detail',
    templateUrl: './codelist-detail.component.html',
    styleUrls: ['./codelist-detail.component.scss']
})
export class CodelistDetailComponent extends BasicTreeDetailComponent implements OnInit {
    public versions: any[] = [];
    public relatedCodelists: Resource[] = [];
    public selectedVersion: string = '';
    public navLinks: MenuItem[];
    public activeLink: MenuItem;

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
            lastUpdateDate: '',
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
                        const resource = new Resource(codelist.urn);
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

    public onLoadDetailVersion(version: string) {
        console.log('entro', version);
        this.router.navigate(['codelists', this.dataDetail!.agency, this.dataDetail!.resourceId, version, 'detail'], { relativeTo: this.route.parent });
        this.versions = [];
    }
}
