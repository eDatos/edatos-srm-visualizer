import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    CodelistFamiliesApiService
} from 'src/app/core/services/api/structural-resources/codelist-families-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';

@Component({
    selector: 'app-family-search',
    templateUrl: './family-search.component.html',
    styleUrls: ['./family-search.component.scss']
})
export class FamilySearchComponent extends BasicSearchComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, apiService: CodelistFamiliesApiService, private localeService: LocaleService) {
        super(apiService, localeService);

        this.searchSimpleForm = this.formBuilder.group({
            filter: ''
        });

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
