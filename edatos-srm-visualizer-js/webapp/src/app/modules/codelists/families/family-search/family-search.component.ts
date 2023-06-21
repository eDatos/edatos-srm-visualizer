import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    CodelistFamiliesApiService
} from 'src/app/core/services/api/structural-resources/codelist/codelist-families-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-family-search',
    templateUrl: './family-search.component.html',
    styleUrls: ['./family-search.component.scss']
})
export class FamilySearchComponent extends BasicTreeSearchComponent implements OnInit {

    fields: any[];
    constructor(protected override formBuilder: FormBuilder, protected override apiService: CodelistFamiliesApiService,
                protected override translateService: TranslateService, protected override localeService: LocaleService) {
        super(apiService, formBuilder, translateService, localeService);

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

        this.fields = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
        ];

        this.selectedDefault = this.fields.filter(opt=>opt.value !== 'description').map(a => a);

        this.searchSimpleForm = this.formBuilder.group({
            filter: '',
            selectedFields:  [this.selectedDefault],
            showAllVersions: [false],
        });
    }


    ngOnInit(): void {
        this.loadInitialData();
    }

}
