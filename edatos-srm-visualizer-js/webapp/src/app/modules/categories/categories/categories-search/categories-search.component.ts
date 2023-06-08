import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoriesApiService } from 'src/app/core/services/api/structural-resources/categories/categories-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';


@Component({
    selector: 'app-categories-search',
    templateUrl: './categories-search.component.html',
    styleUrls: ['./categories-search.component.scss'],
})
export class CategoriesSearchComponent extends BasicTreeSearchComponent implements OnInit {
    @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;

    constructor(protected override formBuilder: FormBuilder, protected override apiService: CategoriesApiService, protected override localeService: LocaleService) {
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
