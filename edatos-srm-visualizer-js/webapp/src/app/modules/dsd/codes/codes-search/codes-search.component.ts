import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DsdApiService } from 'src/app/core/services/api/structural-resources/dsd-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';

@Component({
    selector: 'app-codes-search',
    templateUrl: './codes-search.component.html',
    styleUrls: ['./codes-search.component.scss'],
})
export class CodesSearchComponent extends BasicSearchComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, apiService: DsdApiService, private localeService: LocaleService) {
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
