import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptsApiService } from 'src/app/core/services/api/structural-resources/concepts/concepts-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { MenuItem } from 'primeng/api';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-concept-detail',
    templateUrl: './concepts-detail.component.html',
    styleUrls: ['./concepts-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class ConceptsDetailComponent extends BasicDetailComponent implements OnInit {
    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public recommendedCodelists: TreeNode[] = [];
    public otherConcepts: TreeNode[] = [];

    public conceptColumns: any[];
    public codelistColumns: any[];
    public routerLinkDetail: string = '';

    private isInitialTabSet = false;
    private hasRecommendedCodelists = false;

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: ConceptsApiService,
                protected override route: ActivatedRoute, protected override router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService,
                private cdr: ChangeDetectorRef) {
        super(formBuilder, apiSrmService, route, localeService, translateService, router);

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            uri: '',
            annotations: '',
            resourceId: '',
            conceptScheme: '',
            maintainer: ''
        });

        this.navLinks = [
            {
                label: this.translateService.instant('concepts.recommendedCodelists')
            }, {
                label: this.translateService.instant('concepts.othersConcepts')
            }
        ];

        this.activeLink = this.navLinks[0];

        this.codelistColumns = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.maintainer'), value: 'maintainer' }
        ];

        this.conceptColumns = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.scheme'), value: 'scheme', showTooltip: true },
            { name: this.translateService.instant('resourceParameters.maintainer'), value: 'maintainer' }
        ];
    }

    loadDetailData(loadAll: boolean = true): void {
        if (loadAll) {
            this.loadDataDetailResource(this.dataDetail).subscribe(data => {
                this.dataDetail = data;
                this.detailForm.patchValue(this.dataDetail);

                this.loadRecommendedCodelists();
            });
        } else {
            if (this.activeLink === this.navLinks[0]) this.loadRecommendedCodelists();
            else this.getOtherConcepts();
        }
    }

    private selectFirstTabWithData(): void {
        if (this.isInitialTabSet) return;

        const hasConcepts = this.otherConcepts.length > 0;

        if (!this.hasRecommendedCodelists && hasConcepts) {
            this.activeLink = this.navLinks[1];
        } else {
            this.activeLink = this.navLinks[0];
        }

        this.isInitialTabSet = true;
        this.cdr.detectChanges();
    }

    public onActiveItemChange(event: any) {
        this.defaultParametersSearch();
        this.activeLink = event;
        this.cdr.detectChanges();
        if (this.activeLink === this.navLinks[0]) this.loadRecommendedCodelists();
        else this.getOtherConcepts();
    }

    private loadDataDetailResource(data: any): Observable<ConceptResource> {
        return this.apiSrmService.getDataDetailConceptResourceFromSrm(data);
    }

    private getOtherConcepts() {
        if (this.tableExpandable) this.tableExpandable.dataLoaded = false;
        this.apiSrmService.getOtherConcepts(this.dataDetail, this.searchConfig).subscribe((concept) => {
            this.searchConfig.resultSize = concept['total'];
            if (concept[this.apiSrmService.apiSearchDataPath] && concept['total'] > 0) {
                const resources: any[] = concept[this.apiSrmService.apiSearchDataPath];
                this.apiSrmService.findAllOtherConceptsDetailsFromSrm(resources, true, this.dataDetail.conceptScheme).subscribe((data) => {
                    this.otherConcepts = data;
                    this.tableExpandable.dataLoaded = true;
                    this.selectFirstTabWithData();
                });
            } else {
                this.otherConcepts = [];
                this.tableExpandable.dataLoaded = true;
            }
        });
    }

    private loadRecommendedCodelists(): void {
        if (this.tableExpandable) this.tableExpandable.dataLoaded = false;

        if (this.dataDetail.isVariable) {
            this.apiSrmService.getRecommendedCodelists(this.dataDetail.urnVariable, this.searchConfig).subscribe((data) => {
                this.searchConfig.resultSize = data['total'];
                if (data[this.apiSrmService.apiCodelistDataPath] && data['total'] > 0) {
                    const resources: any[] = data[this.apiSrmService.apiCodelistDataPath];
                    this.apiSrmService.findAllRecommendedCodelistsDetailsFromSrm(resources, true).subscribe((data) => {
                        this.recommendedCodelists = data;
                        this.tableExpandable.dataLoaded = true;
                        this.hasRecommendedCodelists = true;
                        this.selectFirstTabWithData();
                    });
                } else {
                    this.recommendedCodelists = [];
                    if (!this.isInitialTabSet) this.getOtherConcepts();
                }
            });
        } else {
            if (!this.isInitialTabSet) this.getOtherConcepts();
        }
    }

    public override onReturn() {
        this.router.navigate(['concepts'], {relativeTo: this.route.parent});
    }

    public onLoadCodelistDetail(urn: string): void {
        const rootPath = '/codelists/codelists';
        const codelist = new CodelistResource(urn);
        if (codelist) {
            this.routerLinkDetail = `${rootPath}/${codelist.agency}/${codelist.resourceId}/${codelist.version}/detail`;
        }
    }

    public onLoadConceptsDetail(urn: string): void {
        const concept = new ConceptResource(urn);
        if (concept) {
            this.routerLinkDetail = `/concepts/concepts/${concept.agency}/${concept.resourceId}/${concept.id}/${concept.version}/detail`;
        }
    }

    public openConceptSchemeLink(urn: string) {
        const resource = new ConceptResource(urn);
        this.router.navigate(['schemes', resource.agency, resource.resourceId, resource.version, 'detail'], {relativeTo: this.route.parent});
    }

    public isTabDisabled(index: number): boolean {
        if (index === 0) return !this.dataDetail?.isVariable;
        return false;
    }
}