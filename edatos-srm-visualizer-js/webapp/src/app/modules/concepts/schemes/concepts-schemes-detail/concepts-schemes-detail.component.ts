import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ConceptsSchemeApiService
} from 'src/app/core/services/api/structural-resources/concepts/concepts-scheme-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { TranslateService } from '@ngx-translate/core';

import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { BasicDetailComponent } from 'src/app/shared/components/basic-detail/basic-detail.component';
import { Observable } from 'rxjs/internal/Observable';
import {
    ConceptsSchemeApiSdmxService
} from 'src/app/core/services/api/sdmx/concept/concepts-scheme-api-sdmx.service';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-concepts-schemes-detail',
    templateUrl: './concepts-schemes-detail.component.html',
    styleUrls: ['./concepts-schemes-detail.component.scss']
})
export class ConceptsSchemesDetailComponent extends BasicDetailComponent implements OnInit {
    public navLinks: MenuItem[];
    public activeLink: MenuItem;

    public versions: any[] = [];
    public conceptsOfScheme: TreeNode[] = [];

    public columns: any[];
    public routerLinkDetail: string = '';

    public selectedVersion: string = '';

    constructor(protected override formBuilder: FormBuilder, protected override apiSrmService: ConceptsSchemeApiService,
                protected override route: ActivatedRoute, protected override router: Router,
                protected override localeService: LocaleService, protected override translateService: TranslateService,
                protected override apiSdmxService: ConceptsSchemeApiSdmxService) {
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
            maintainer: '',
        });

        this.navLinks = [
            {
                label: this.translateService.instant('concepts.parameters.schemeConcepts')
            }
        ];

        this.activeLink = this.navLinks[0];

        this.columns = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.description'), value: 'description' }
        ];

    }

    loadDetailData(): void {
        this.loadDataDetailResource(this.dataDetail).subscribe(data => {
            this.dataDetail = data;
            this.detailForm.patchValue(this.dataDetail);
            this.loadAllVersionsFromResource();
            this.loadConceptsOfScheme();
        });

    }

    private loadConceptsOfScheme(): void {
        this.apiSrmService.loadConceptsOfScheme(this.dataDetail).subscribe((data) => {
            if (data[this.apiSrmService.apiChildrenDataPath]) {
                const resources: any[] = data[this.apiSrmService.apiChildrenDataPath];
                this.apiSrmService.findAllConceptsResourcesDetailsWithMaintainerAndSchemeFromSrm(resources, true).subscribe((concepts) => {
                    this.conceptsOfScheme = concepts;
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
            this.selectedVersion = this.dataDetail.version;
            if (data) {
                data.forEach((version: any) => {
                    this.versions.push({ value: version });
                });
            }
        });
    }

    public override onReturn() {
        this.router.navigate(['schemes'], { relativeTo: this.route.parent });
    }

    private loadDataDetailResource(data: any): Observable<ConceptResource> {
        return this.apiSrmService.getDataDetailConceptResourceFromSrm(data);
    }

    public onLoadConceptsDetail(urn: string): void {
        const concept = new ConceptResource(urn);
        if (concept && !this.tableExpandable.navigate) {
            this.routerLinkDetail = `/concepts/concepts/${concept.agency}/${concept.resourceId}/${concept.id}/${concept.version}/detail`;
        } else if (concept) {
            this.router.navigate(['concepts', concept.agency, concept.resourceId, concept.id, concept.version, 'detail'], { relativeTo: this.route.parent });
        }
    }

    public onActiveItemChange(link: any) {
        this.activeLink = link;
    }
}
