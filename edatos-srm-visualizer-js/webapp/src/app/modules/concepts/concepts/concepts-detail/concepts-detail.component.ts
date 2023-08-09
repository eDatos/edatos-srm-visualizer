import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptsApiService } from 'src/app/core/services/api/structural-resources/concepts/concepts-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { MenuItem } from 'primeng/api';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';

@Component({
    selector: 'app-concepts-detail',
    templateUrl: './concepts-detail.component.html',
    styleUrls: ['./concepts-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConceptsDetailComponent extends BasicDetailComponent implements OnInit {
    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public recommendedCodelists: TreeNode[] = [];
    public otherConcepts: TreeNode[] = [];

    public conceptColumns: any[];
    public codelistColumns: any[];
    public routerLinkDetail: string = '';

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: ConceptsApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiSrmService, route, localeService, translateService);
        this.showChildrenTree = true;
        this.isDataWithChildrenTree = false;
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
            { name: this.translateService.instant('resourceParameters.scheme'), value: 'scheme' }
        ];

        this.conceptColumns = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.scheme'), value: 'scheme' }
        ];
    }

    public updateTableChildrenTreeNode(data: any): void {
    }

    public loadAllVersionsFromResource(): void {
    }

    public mapperDataResourceDetail(data: any): void {
        this.dataDetail = new ConceptResource(data.urn);
        this.apiSrmService.getDetailSchemeFromSrm(this.dataDetail).subscribe((scheme) => {
            let nameScheme = this.localeService.getTextValue(scheme.name.text);
            this.dataDetail!.conceptScheme = scheme.id + ' (' + nameScheme + ')';
            this.getDetailForm();
        });
    }

    public onActiveItemChange(event: any) {
        this.activeLink = event;
        if (this.activeLink == this.navLinks[1]) {
            this.apiSrmService.getOtherConcepts(this.dataDetail).subscribe((concept) => {
                if (concept[this.apiSrmService.apiSearchDataPath]) {
                    let resource = new ConceptResource(concept.urn);
                    this.apiSrmService.getDetailManteinerFromSrm(resource.agency).subscribe((maintainer) => {
                        this.apiSrmService.getDetailSchemeFromSrm(resource).subscribe((scheme) => {
                            let nameScheme = this.localeService.getTextValue(scheme.name.text);
                            let nameMaintainer = this.localeService.getTextValue(maintainer.name.text);

                            const resourceToTreeNode: TreeNode = {
                                name: this.localeService.getTextValue(concept.name?.text),
                                id: resource.id,
                                urn: concept.urn,
                                description: this.localeService.getTextValue(concept.description?.text),
                                selfLink: concept.selfLink.href,
                                maintainer: `${maintainer.id} - ${nameMaintainer}`,
                                scheme: `${scheme.id} - ${nameScheme}`
                            };
                            this.otherConcepts = [...this.otherConcepts, resourceToTreeNode];
                        });
                    });
                    this.otherConcepts.filter((concept: any) => concept.id != this.dataDetail?.id);
                }
                this.dataChildrenLoaded = true;
            });
        }
    }

    loadDetailDataOnInit(): void {
        this.loadRecommendedCodelists();
    }

    private loadRecommendedCodelists(): void {
        this.apiSrmService.getRecommendedCodelists(this.resource.variable?.urn).subscribe((data) => {
            if (data[this.apiSrmService.apiCodelistDataPath]) {
                data[this.apiSrmService.apiCodelistDataPath].forEach((codelist: any) => {
                    this.apiSrmService.getDetailManteinerFromSrm(new CodelistResource(codelist.urn).agency).subscribe((maintainer) => {
                        let nameMaintainer = this.localeService.getTextValue(maintainer.name.text);
                        const resourceToTreeNode: TreeNode = {
                            name: this.localeService.getTextValue(codelist.name.text),
                            id: codelist.id,
                            urn: codelist.urn,
                            description: this.localeService.getTextValue(codelist.description?.text),
                            selfLink: codelist.selfLink.href,
                            maintainer: `${maintainer.id} - ${nameMaintainer}`,
                            scheme: ''
                        };
                        this.recommendedCodelists = [...this.recommendedCodelists, resourceToTreeNode];
                    });
                });
            }
            this.dataChildrenLoaded = true;
        });
    }

    public onLoadCodelistDetail(urn: string): void {
        const codelist = new CodelistResource(urn);
        if (codelist) {
            this.routerLinkDetail = `/concepts/concepts/${codelist.agency}/${codelist.resourceId}/${codelist.id}/${codelist.version}/detail`;
        }
    }

    public onLoadConceptsDetail(urn: string): void {
        const codelist = new CodelistResource(urn);
        if (codelist) {
            this.routerLinkDetail = `/concepts/concepts/${codelist.agency}/${codelist.resourceId}/${codelist.id}/${codelist.version}/detail`;
        }
    }
}
