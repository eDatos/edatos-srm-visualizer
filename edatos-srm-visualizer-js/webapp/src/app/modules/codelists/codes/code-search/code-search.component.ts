import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CodelistCodesApiService } from 'src/app/core/services/api/structural-resources/codelist/codelist-codes-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-code-search',
    templateUrl: './code-search.component.html',
    styleUrls: ['./code-search.component.scss'],
})
export class CodeSearchComponent extends BasicTreeSearchComponent implements OnInit {
    fields: any[];
    constructor(protected override formBuilder: FormBuilder, protected override apiService: CodelistCodesApiService,
                protected override translateService: TranslateService, protected override localeService: LocaleService) {
        super(apiService, formBuilder, translateService, localeService);

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

        this.fields = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.description'), value: 'description' },
            { name: this.translateService.instant('resourceParameters.scheme'), value: 'urn' }
        ];

        this.selectedDefault = this.fields.filter(opt=>opt.value !== 'description').map(a => a);

    }
    ngOnInit(): void {
        this.loadInitialData();
    }

}
