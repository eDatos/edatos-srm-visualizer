import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
    CodelistCodesApiService
} from 'src/app/core/services/api/structural-resources/codelist/codelist-codes-api.service';
import {LocaleService} from 'src/app/core/services/locale.service';
import {TranslateService} from '@ngx-translate/core';
import {MenuItem} from 'primeng/api';
import {CodelistResource} from 'src/app/shared/models/resources/codelist-resource.model';
import {BasicDetailComponent} from 'src/app/shared/components/basic-detail/basic-detail.component';
import {Observable} from 'rxjs/internal/Observable';
import {TreeNode} from 'src/app/shared/models/tree/tree-node';
import {ConceptResource} from 'src/app/shared/models/resources/concept-resource.model';
import {IInfiniteScrollEvent} from 'ngx-infinite-scroll';

@Component({
    selector: 'app-code-detail',
    templateUrl: './code-detail.component.html',
    styleUrls: ['./code-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class CodeDetailComponent extends BasicDetailComponent implements OnInit {

    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public equivalentCodes: TreeNode[] = [];

    public codeColumns: any[];
    public routerLinkDetail: string = '';

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: CodelistCodesApiService,
                protected override route: ActivatedRoute, protected override router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService,
                private cdr: ChangeDetectorRef) {
        super(formBuilder, apiSrmService, route, localeService, translateService, router);

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            maintainer: '',
            annotations: '',
            codelist: '',
            uri: ''
        });
        this.navLinks = [
            {
                label: this.translateService.instant('codelists.otherCodes')
            }, {
                label: this.translateService.instant('codelists.equivalentCodes')
            }
        ];

        this.activeLink = this.navLinks[0];

        this.codeColumns = [
            {name: this.translateService.instant('resourceParameters.identifier'), value: 'id'},
            {name: this.translateService.instant('resourceParameters.name'), value: 'name'},
            {name: this.translateService.instant('resourceParameters.description'), value: 'description'}
        ];

    }

    loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadChildrenTreeData();
            this.loadEquivalentCodes();
            if ((!this.dataChildren || this.dataChildren.length === 0) && this.activeLink === this.navLinks[0]) {
                this.checkTabSelection();
            }
        });
    }

    public onActiveItemChange(event: any) {
        this.activeLink = event;
        this.cdr.detectChanges();
        if (this.activeLink == this.navLinks[0]) {
            this.loadChildrenTreeData();
        } else if (this.activeLink == this.navLinks[1]) {
            this.defaultParametersSearch();
            this.equivalentCodes = new Array<TreeNode>();
            this.loadEquivalentCodes();
        }
    }

    private loadDataDetailResource(data: any): Observable<CodelistResource> {
        return this.apiSrmService.getDataDetailCodelistResourceFromSrm(data, this.translateService, true);
    }

    private loadEquivalentCodes(): void {
        if (this.dataDetail.isVariableElement) {
            this.apiSrmService.loadEquivalentCodes(this.dataDetail.variableElementUrn, this.searchConfig).subscribe((data) => {
                this.searchConfig.resultSize = data['total'];
                if (data[this.apiSrmService.apiSearchDataPath]) {
                    const resources = data[this.apiSrmService.apiSearchDataPath];
                    this.apiSrmService.findAllOtherCodesDetailsFromSrm(resources, true).subscribe((data) => {
                        this.equivalentCodes = [...this.equivalentCodes, ...data];
                        if (this.tableExpandable) this.tableExpandable.dataLoaded = true;
                    });
                } else {
                    if (this.tableExpandable) this.tableExpandable.dataLoaded = true;
                }
            });
        } else {
            this.equivalentCodes = [];
            if (this.tableExpandable) this.tableExpandable.dataLoaded = true;
        }
    }

    public onLoadCodeDetail(urn: string): void {
        const codelist = new CodelistResource(urn);
        if (codelist) {
            this.routerLinkDetail = `/codelists/codes/${codelist.agency}/${codelist.resourceId}/${codelist.id}/${codelist.version}/detail`;
        }
    }

    public override onReturn() {
        this.router.navigate(['codes'], {relativeTo: this.route.parent});
    }

    public onloadTreeNodeDetailData(urn: string) {
        let resource = new CodelistResource(urn);
        this.routerLinkDetail = `/codelists/codes/${resource.agency}/${resource.resourceId}/${resource.id}/${resource.version}/detail`;
    }

    public openCodelistLink(urn: string) {
        const resource = new ConceptResource(urn);
        this.router.navigate(['codelists', resource.agency, resource.resourceId, resource.version, 'detail'], {relativeTo: this.route.parent});
    }

    public override onScrollDown($event: IInfiniteScrollEvent): void {
        this.searchConfig.resultOffset = ++this.searchConfig.currentPage * this.searchConfig.resultLimit;
        this.loadEquivalentCodes();
    }

    private checkTabSelection(): void {
        const hasChildren = this.dataChildren && this.dataChildren.length > 0;
        const isVariable = this.dataDetail.isVariableElement;

        if (!hasChildren && isVariable) {
            this.activeLink = this.navLinks[1];
            this.loadEquivalentCodes();
        }
    }

}
