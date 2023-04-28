import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CodelistFamiliesApiService } from 'src/app/core/services/api/structural-resources/codelist-families-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';

@Component({
    selector: 'app-family-search',
    templateUrl: './family-search.component.html',
    styleUrls: ['./family-search.component.scss'],
})
export class FamilySearchComponent extends BasicSearchComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, apiService: CodelistFamiliesApiService, private localeService: LocaleService) {
        super(apiService, localeService);

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
