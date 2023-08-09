import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConceptsSchemeApiService } from 'src/app/core/services/api/structural-resources/concepts/concepts-scheme-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';

import { TranslateService } from '@ngx-translate/core';
import { ConceptResource } from 'src/app/shared/models/resources/concept-resource.model';
import { TreeNode } from 'src/app/shared/models/tree/tree-node';
import { Resource } from 'src/app/shared/models/resources/resource.model';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'app-concepts-schemes-search',
    templateUrl: './concepts-schemes-search.component.html',
    styleUrls: ['./concepts-schemes-search.component.scss'],
})
export class ConceptsSchemesSearchComponent extends BasicSearchComponent implements OnInit {

    constructor(protected override formBuilder: FormBuilder, protected override apiService: ConceptsSchemeApiService, 
                protected override translateService: TranslateService, protected override localeService: LocaleService) {
        super(apiService, formBuilder, translateService, localeService);

        this.searchForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
        });

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            scheme: '',
        });

        this.fields = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.description'), value: 'description' },
            { name: this.translateService.instant('resourceParameters.maintainer'), value: 'maintainer' }
        ];

        this.selectedDefault = this.fields.filter(opt=>opt.value !== 'description');
        this.searchSimpleForm = this.formBuilder.group({
            filter: '',
            selectedFields:  [this.selectedDefault],
            showAllVersions: [false],
        });
    }

    ngOnInit(): void {
        this.loadInitialData();
    }

    public onLoadConceptSchemeDetail(urn: string): void {
        this.dataDetail = new ConceptResource(urn);
        this.apiService.getDetailFromSrm(this.dataDetail).subscribe((data) => {
            (this.dataDetail!.description = this.localeService.getTextValue(data.description?.text));
            (this.dataDetail!.name = this.localeService.getTextValue(data.name?.text));
            this.detailForm.patchValue(this.dataDetail);
        });
        this.routerLinkDetail = this.dataDetail?.agency + '/' + this.dataDetail?.resourceId + '/' +  this.dataDetail?.version + '/detail';
    }

    protected getDataChildren(resources: Resource[]): Observable<TreeNode[]> {
        return this.apiService.findAllDetailsWithMaintainerFromSrm(resources, this.apiService.isLatestVersion);
    }

}
