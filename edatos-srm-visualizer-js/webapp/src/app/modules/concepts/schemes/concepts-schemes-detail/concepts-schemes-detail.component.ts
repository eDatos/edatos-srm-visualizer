import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ConceptsSchemeApiService
} from 'src/app/core/services/api/structural-resources/concepts/concepts-scheme-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';
import {
    ConceptsSchemeApiSdmxService
} from 'src/app/core/services/api/sdmx/concept/concepts-scheme-api-sdmx.service';


@Component({
    selector: 'app-concepts-schemes-detail',
    templateUrl: './concepts-schemes-detail.component.html',
    styleUrls: ['./concepts-schemes-detail.component.scss']
})
export class ConceptsSchemesDetailComponent extends BasicDetailComponent implements OnInit {
    public navLinks: MenuItem[];

    public versions: any[] = [];
    public conceptsOfScheme: TreeNode[] = [];

    public selectedVersion: string = '';

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: ConceptsSchemeApiService,
                protected override route: ActivatedRoute, private router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService,
                protected override apiSdmxService: ConceptsSchemeApiSdmxService) {
        super(formBuilder, apiSrmService, route, localeService, translateService, apiSdmxService);
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

    loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadAllVersionsFromResource();
        });

    }

    private loadConceptsOfScheme(): void {
        this.apiSrmService.loadConceptsOfScheme(this.dataDetail).subscribe((data) => {
            if (data[this.apiSrmService.apiChildrenDataPath]) {
                const resources = data[this.apiSrmService.apiChildrenDataPath];
                this.apiSrmService.findAllResourcesDetailsWithMaintainerAndSchemeFromSrm(resources, true).subscribe((data) => {
                    this.conceptsOfScheme = data;
                    this.dataChildrenLoaded = true;
                });
            }
        });
    }

    public onLoadDetailVersion(event: any) {
        this.versions = [];
        this.selectedVersion = event.value;
        this.router.navigate(['schemes', this.dataDetail!.agency, this.dataDetail!.resourceId, this.selectedVersion, 'detail'], { relativeTo: this.route.parent });
    }
    private loadAllVersionsFromResource(): void {
        this.apiSrmService.getAllVersionsFromResource(this.dataDetail!).subscribe((data) => {
            if (data) {
                data.forEach((version: any) => {
                    this.versions.push({ value: version });
                });
            }
        });
    }

    private loadDataDetailResource(data: any): Observable<ConceptResource> {
        return this.apiSrmService.getDataDetailConceptResourceFromSrm(data);
    }
}
