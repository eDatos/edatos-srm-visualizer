import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodelistsApiService } from 'src/app/core/services/api/structural-resources/codelist/codelists-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { MenuItem } from 'primeng/api';
import { CodelistApiSdmxService } from 'src/app/core/services/api/sdmx/codelist/codelist-api-sdmx.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';


@Component({
    selector: 'app-codelist-detail',
    templateUrl: './codelist-detail.component.html',
    styleUrls: ['./codelist-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class CodelistDetailComponent extends BasicDetailComponent implements OnInit {
    public versions: any[] = [];

    public selectedVersion: string = '';
    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public routerLinkDetail: string = '';
    public columns: any[];
    public relationatedCodelist: TreeNode[] = [];

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: CodelistsApiService,
                protected override route: ActivatedRoute, protected override router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService,
                protected override apiSdmxService: CodelistApiSdmxService, private cdr: ChangeDetectorRef) {
        super(formBuilder, apiSrmService, route, localeService, translateService, router, apiSdmxService);

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            agency: '',
            annotations: '',
            uri: '',
            publicationDate: '',
            isRecommended: '',
            maintainer: ''
        });

        this.navLinks = [
            {
                label: this.translateService.instant('codelists.codes')
            }, {
                label: this.translateService.instant('codelists.relatedCodelist')
            }
        ];

        this.activeLink = this.navLinks[0];

        this.columns = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.maintainer'), value: 'maintainer' }
        ];

    }

    protected loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadChildrenTreeData();
            this.loadAllVersionsFromResource();
        });
    }

    private loadDataDetailResource(data: any): Observable<CodelistResource> {
        return this.apiSrmService.getDataDetailCodelistResourceFromSrm(data, this.translateService, false);
    }


    onloadTreeNodeDetailData(urn: string) {
        const resource = new CodelistResource(urn);
        this.router.navigate(['codes', resource.agency, resource.resourceId, resource.id, resource.version, 'detail'], { relativeTo: this.route.parent });
    }

    public override onReturn() {
        this.router.navigate(['codelists'], { relativeTo: this.route.parent });
    }

    onActiveItemChange(link: any) {
        this.activeLink = link;
        this.cdr.detectChanges();
        if (this.activeLink == this.navLinks[0]) {
            this.loadChildrenTreeData();
        } else if (this.activeLink == this.navLinks[1]) {
            this.defaultParametersSearch();
            this.relationatedCodelist = new Array<TreeNode>();
            this.loadRelatedCodelistDetails(this.dataDetail.variableUrn);
        }
    }

    private loadRelatedCodelistDetails(variableUrn: string) {
        if (this.dataDetail.variableUrn != '') {
            this.apiSrmService.getRelatedCodelist(variableUrn, this.searchConfig).subscribe((data) => {
                this.searchConfig.resultSize = data['total'];
                if (data[this.apiSrmService.apiSearchDataPath]) {
                    const resources = data[this.apiSrmService.apiSearchDataPath];
                    this.apiSrmService.findAllRelatedCodelistDetailsFromSrm(resources, true).subscribe((codelist) => {
                        this.relationatedCodelist = [...this.relationatedCodelist, ...codelist];
                        this.tableExpandable.dataLoaded = true;
                    });
                }
            });
        } else {
            this.relationatedCodelist = [];
            this.tableExpandable.dataLoaded = true;
        }
    }

    private loadAllVersionsFromResource() {
        this.apiSrmService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            this.selectedVersion = this.dataDetail.version;
            if (data) {
                data.forEach((version: any) => {
                    this.versions.push({ value: version });
                });
            }
        });
    }

    public onLoadDetailVersion(event: any) {
        this.versions = [];
        this.selectedVersion = event.value;
        this.router.navigate(['codelists', this.dataDetail!.agency, this.dataDetail!.resourceId, this.selectedVersion, 'detail'], { relativeTo: this.route.parent });
    }

    public onLoadCodelistDetail(urn: string): void {
        const codelist = new CodelistResource(urn);
        if (codelist) {
            this.routerLinkDetail = `/codelists/codelists/${codelist.agency}/${codelist.resourceId}/${codelist.version}/detail`;
        }
    }

    public override onScrollDown($event: IInfiniteScrollEvent): void {
        this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
        this.loadRelatedCodelistDetails(this.dataDetail.variableUrn);
    }
}
