import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ConceptsSchemeApiService
} from 'src/app/core/services/api/structural-resources/concepts/concepts-scheme-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicDetailComponent } from 'src/app/shared/components/basic-tree-detail/basic-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';


@Component({
    selector: 'app-concepts-schemes-detail',
    templateUrl: './concepts-schemes-detail.component.html',
    styleUrls: ['./concepts-schemes-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConceptsSchemesDetailComponent extends BasicDetailComponent implements OnInit {
    public navLinks: MenuItem[];

    public versions: any[] = [];
    public conceptsOfScheme: ConceptResource[] = [];

    public selectedVersion: string = '';

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: ConceptsSchemeApiService,
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
            version: '',
            agency: '',
            annotations: '',
            uri: '',
            maintainer: '',
        });

        this.navLinks = [
            {
                label: this.translateService.instant('concepts.parameters.schemeConcepts')
            }
        ];

    }

    public updateTableChildrenTreeNode(data: any): void {}

    private loadConceptsOfScheme(): void {
        this.apiSrmService.loadConceptsOfScheme(this.dataDetail).subscribe((data) => {
            if (data[this.apiSrmService.apiChildrenDataPath]) {
                this.conceptsOfScheme = data[this.apiSrmService.apiChildrenDataPath].map((concept: any) => {
                    const resource = new ConceptResource(concept.urn);
                    resource.id = concept.id;
                    resource.name = this.localeService.getTextValue(concept.name?.text);
                    resource.description = this.localeService.getTextValue(concept.description?.text);
                    return resource;
                });
                this.dataChildrenLoaded = true;
            }
        });
    }

    public onLoadDetailVersion(version: string) {
        this.router.navigate(['schemes', this.dataDetail!.agency, this.dataDetail!.resourceId, version, 'detail'], { relativeTo: this.route.parent });
        this.versions = [];
    }
    public loadAllVersionsFromResource(): void {
        this.apiSrmService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            if (data) {
                console.log(data);
                data.filter((version: any) => version !== this.dataDetail!.version).reverse().forEach((version: any) => {
                    this.versions.push({value: version});
                });
            }
        });
    }

    public mapperDataResourceDetail(data: any): void {
        this.dataDetail = new ConceptResource(data.urn);
        this.getDetailForm();
    }

    public loadDetailDataOnInit(): void {
        this.loadConceptsOfScheme();
    }

}
