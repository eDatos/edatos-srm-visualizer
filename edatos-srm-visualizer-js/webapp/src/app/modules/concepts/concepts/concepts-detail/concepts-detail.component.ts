import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptsApiService } from 'src/app/core/services/api/structural-resources/concepts/concepts-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-tree-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { MenuItem } from 'primeng/api';
import { CodelistResource } from 'src/app/shared/models/resources/codelist-resource.model';

@Component({
    selector: 'app-concepts-detail',
    templateUrl: './concepts-detail.component.html',
    styleUrls: ['./concepts-detail.component.scss'],
})
export class ConceptsDetailComponent extends BasicTreeDetailComponent implements OnInit {
    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public recommendedCodelists: ConceptResource[] = [];
    public otherConcepts: CodelistResource[] = [];
    constructor(protected override formBuilder: FormBuilder, protected override apiService: ConceptsApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService) {
        super(formBuilder, apiService, route, localeService, translateService);
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
            agency: '',
        });

        this.navLinks = [
            {
                label: this.translateService.instant('concepts.recommendedCodelists')
            }, {
                label: this.translateService.instant('concepts.othersConcepts')
            }
        ];

        this.activeLink = this.navLinks[0];
    }

    public updateTableChildrenTreeNode(data: any): void {}

    public loadAllVersionsFromResource(): void {}

    public parseDesriptionToHtml(): string {
        return this.detailForm.get('description')?.value || '';
    }

    public mapperDataResourceDetail(data: any): void {
        this.dataDetail = new ConceptResource(data.urn);
        this.dataDetail!.description = this.localeService.getTextValue(data.description?.text);
        this.dataDetail!.name = this.localeService.getTextValue(data.name?.text);
        this.dataDetail!.annotations = this.localeService.getTextValue(data.annotations?.text);
        this.dataDetail!.uri = data.selfLink?.href;

        this.detailForm.patchValue(this.dataDetail);
    }

    public onActiveItemChange(event: any) {
        this.activeLink = event;
        if (this.activeLink == this.navLinks[1]) {
            this.apiService.getOtherConcepts(this.dataDetail).subscribe((data) => {
                if (data[this.apiService.apiSearchDataPath]) {
                    this.otherConcepts = data[this.apiService.apiSearchDataPath].map((concept: any) => {
                        const resource = new ConceptResource(concept.urn);
                        resource.id = concept.id;
                        resource.name = this.localeService.getTextValue(concept.name?.text);
                        resource.description = this.localeService.getTextValue(concept.description?.text);
                        return resource;
                    });
                    this.dataChildrenLoaded = true;
                }
            });
            this.otherConcepts.filter((concept: any) => concept.id != this.dataDetail?.id);
        }
    }

    loadDetailDataOnInit(): void {
        this.loadRecommendedCodelists()
    }

    private loadRecommendedCodelists(): void {
        this.apiService.getRecommendedCodelists(this.resource.variable?.urn).subscribe((data) => {
            if (data[this.apiService.apiCodelistDataPath]) {
                this.recommendedCodelists = data[this.apiService.apiCodelistDataPath].map((codelist: any) => {
                    const resource = new CodelistResource(codelist.urn);
                    resource.id = codelist.id;
                    resource.name = this.localeService.getTextValue(codelist.name?.text);
                    resource.description = this.localeService.getTextValue(codelist.description?.text);
                    return resource;
                });
                this.dataChildrenLoaded = true;
            }
        });
    }
}
