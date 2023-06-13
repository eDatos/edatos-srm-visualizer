import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CodelistsApiService } from 'src/app/core/services/api/structural-resources/codelists-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from '../../../../shared/components/basic-search/tree/basic-tree-search.component';
import { TableTreeComponent } from '../../../../shared/components/table-tree/table-tree.component';

@Component({
    selector: 'app-codelist-search',
    templateUrl: './codelist-search.component.html',
    styleUrls: ['./codelist-search.component.scss'],
})
export class CodelistSearchComponent extends BasicTreeSearchComponent implements OnInit {
    @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;
    constructor(private formBuilder: FormBuilder, apiService: CodelistsApiService, private localeService: LocaleService) {
        super(apiService, localeService);

        this.searchSimpleForm = this.formBuilder.group({
            filter: ''
        });

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
