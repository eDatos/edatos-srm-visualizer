import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    CodelistFamiliesApiService
} from 'src/app/core/services/api/structural-resources/codelist/codelist-families-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';


@Component({
    selector: 'app-family-search',
    templateUrl: './family-search.component.html',
    styleUrls: ['./family-search.component.scss']
})
export class FamilySearchComponent extends BasicTreeSearchComponent implements OnInit {
    constructor(protected override formBuilder: FormBuilder, protected override apiService: CodelistFamiliesApiService, protected override localeService: LocaleService) {
        super(apiService, formBuilder, localeService);

        this.searchForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: ''
        });

        this.detailForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            version: '',
            scheme: ''
        });
    }

    ngOnInit(): void {
        this.loadInitialData();
    }

}
