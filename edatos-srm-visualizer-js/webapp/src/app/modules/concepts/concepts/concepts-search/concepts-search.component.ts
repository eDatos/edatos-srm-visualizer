import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConceptsApiService } from 'src/app/core/services/api/structural-resources/concepts/concepts-api.service';
import { MultiSelect } from 'primeng/multiselect';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-search/basic-tree-search.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-concepts-navbar-search',
    templateUrl: './concepts-search.component.html',
    styleUrls: ['./concepts-search.component.scss'],
})

export class ConceptsSearchComponent extends BasicTreeSearchComponent implements OnInit {
    @ViewChild('multiSelect', { static: false }) multiSelect!: MultiSelect;
    advancedSearch = false;
    fields: any[];
    showAllVersions = true;
    selectedDefault: any[]= [];
    filter = '';
    marked = false;
 
    
    constructor(private formBuilder: FormBuilder, protected override apiService: ConceptsApiService, protected override localeService: LocaleService, private translateService: TranslateService) {
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

        this.fields = [
            { name: this.translateService.instant('resourceParameters.identifier'), value: 'id' },
            { name: this.translateService.instant('resourceParameters.name'), value: 'name' },
            { name: this.translateService.instant('resourceParameters.description'), value: 'description' },
            { name: this.translateService.instant('resourceParameters.scheme'), value: 'urn' }
        ];
        this.selectedDefault = this.fields.filter(opt=>opt.value !== 'description').map(a => a);

        this.searchSimpleForm = this.formBuilder.group({
            filter: '',
            selectedFields:  [this.selectedDefault],
            showAllVersions: [true],
        });

    }
    

    ngOnInit(): void {
        this.loadInitialData();
    }

    onEnter(): void {
        this.onSearch();
    }


    checkValue(event: any) {
        console.log(event);
    }

    toggleVisibility(e: any) {
        this.marked = e.checked;
    }

    handleOnPanelShow() {
        this.multiSelect.dropdownIcon = 'fa-solid fa-chevron-up';
    }

    handleOnPanelHide() {
        this.multiSelect.dropdownIcon = 'fa-thin fa-chevron-down';
    }


}
