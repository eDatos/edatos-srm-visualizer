import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import {OrganizationsSchemeApiService} from "src/app/core/services/api/structural-resources/organizations-scheme-api.service";

@Component({
    selector: 'app-schemes-search',
    templateUrl: './schemes-search.component.html',
    styleUrls: ['./schemes-search.component.scss'],
})
export class SchemesSearchComponent extends BasicTreeSearchComponent implements OnInit {
    @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;

    constructor(private formBuilder: FormBuilder, protected override apiService: OrganizationsSchemeApiService, protected override localeService: LocaleService) {
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
