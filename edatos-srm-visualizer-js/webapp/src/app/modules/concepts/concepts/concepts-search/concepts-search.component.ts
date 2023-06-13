import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConceptsApiService } from 'src/app/core/services/api/structural-resources/concepts-api.service';
import { MultiSelect } from 'primeng/multiselect';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicTreeSearchComponent } from 'src/app/shared/components/basic-tree-search/basic-tree-search.component';

@Component({
    selector: 'app-concepts-navbar-search',
    templateUrl: './concepts-search.component.html',
    styleUrls: ['./concepts-search.component.scss'],
})

export class ConceptsSearchComponent extends BasicTreeSearchComponent implements OnInit {
    @ViewChild('multiSelect', { static: false }) multiSelect!: MultiSelect;
    advancedSearch = false;
    fields: any[];
    item = '';
    checkbox = 'fa-thin fa-toggle-off';
    selectedItems = [];
    selectedFields: string[] = [];
    
    constructor(private formBuilder: FormBuilder, apiService: ConceptsApiService, private localeService: LocaleService) {
        super(apiService, localeService);

        this.searchForm = this.formBuilder.group({
            id: '',
            name: '',
            urn: '',
            description: '',
            inputSearch: '',
            selectedFields:  []
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
            { name: "Identificador" },
            { name: "Nombre" },
            { name: "Descripción" },
            { name: "Esquema" }
          ];
          
    }
    

    ngOnInit(): void {
        this.loadInitialData();
    }

    onEnter(): void {
        this.onSearch();
    }

    isAdvancedSearch() {
        return this.advancedSearch;
    }

    showAdvancedSearch() {
        this.advancedSearch = true;
    }
    checkValue(event: any){
        console.log(event);
     }

     marked = false;
  theCheckbox = false;

  
  toggleVisibility(e: any){
    this.marked= e.target.checked;
  }

  handleOnPanelShow() {
    this.multiSelect.dropdownIcon = 'fa-solid fa-chevron-up';
}

handleOnPanelHide() {
this.multiSelect.dropdownIcon = 'fa-thin fa-chevron-down';

}



    openPanel() {
        this.multiSelect.show();

      }
}
