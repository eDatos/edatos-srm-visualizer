import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConceptsSchemeApiService } from 'src/app/core/services/api/structural-resources/concepts/concepts-scheme-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';

@Component({
    selector: 'app-concepts-schemes-search',
    templateUrl: './concepts-schemes-search.component.html',
    styleUrls: ['./concepts-schemes-search.component.scss'],
})
export class ConceptsSchemesSearchComponent extends BasicTreeSearchComponent implements OnInit {

    constructor(protected override formBuilder: FormBuilder, protected override apiService: ConceptsSchemeApiService, protected override localeService: LocaleService) {
        super(apiService, formBuilder, localeService);

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
    }
    ngOnInit(): void {
        this.loadInitialData();
    }

}
