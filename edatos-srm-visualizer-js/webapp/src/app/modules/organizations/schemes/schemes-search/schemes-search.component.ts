import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';
import {OrganizationsSchemeApiService} from "src/app/core/services/api/structural-resources/organizations/organizations-scheme-api.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-schemes-search',
    templateUrl: './schemes-search.component.html',
    styleUrls: ['./schemes-search.component.scss'],
})
export class SchemesSearchComponent extends BasicTreeSearchComponent implements OnInit {

    constructor(protected override formBuilder: FormBuilder, protected override apiService: OrganizationsSchemeApiService, protected override translateService: TranslateService) {
        super(apiService, formBuilder, translateService);

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
