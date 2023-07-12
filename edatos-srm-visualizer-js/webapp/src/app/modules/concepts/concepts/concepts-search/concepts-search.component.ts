import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConceptsApiService } from 'src/app/core/services/api/structural-resources/concepts/concepts-api.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from '../../../../core/services/locale.service';

@Component({
    selector: 'app-concepts-navbar-search',
    templateUrl: './concepts-search.component.html',
    styleUrls: ['./concepts-search.component.scss'],
})

export class ConceptsSearchComponent extends BasicTreeSearchComponent implements OnInit {

    constructor(protected override formBuilder: FormBuilder, protected override apiService: ConceptsApiService,
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
            { name: this.translateService.instant('resourceParameters.scheme'), value: 'urn' }
        ];
        this.selectedDefault = this.fields.filter(opt=>opt.value !== 'description').map(a => a);

        this.searchSimpleForm = this.formBuilder.group({
            filter: '',
            selectedFields:  [this.selectedDefault],
            showAllVersions: [false],
        });

    }
    

    ngOnInit(): void {
        this.loadInitialData();
    }
}
