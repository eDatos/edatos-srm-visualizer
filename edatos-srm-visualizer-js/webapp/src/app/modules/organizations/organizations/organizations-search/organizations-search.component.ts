import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';
import { OrganizationsApiService } from 'src/app/core/services/api/structural-resources/organizations/organizations-api.service';

@Component({
    selector: 'app-organizations-search',
    templateUrl: './organizations-search.component.html',
    styleUrls: ['./organizations-search.component.scss'],
})
export class OrganizationsSearchComponent extends BasicTreeSearchComponent implements OnInit {

    constructor(protected override formBuilder: FormBuilder, protected override apiService: OrganizationsApiService, protected override localeService: LocaleService) {
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
