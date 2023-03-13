import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConceptsSchemeApiService } from 'src/app/core/services/api/structural-resources/concepts-scheme-api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';

@Component({
  selector: 'app-concepts-schemes-search',
  templateUrl: './concepts-schemes-search.component.html',
  styleUrls: ['./concepts-schemes-search.component.scss']
})
export class ConceptsSchemesSearchComponent extends BasicSearchComponent implements OnInit {

  @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;

  constructor(private formBuilder: FormBuilder, apiService: ConceptsSchemeApiService, private localeService: LocaleService) {
    super(apiService, localeService);

    this.searchForm = this.formBuilder.group({
      id: '',
      name: '',
      urn: '',
      description: ''
    })

    this.detailForm = this.formBuilder.group({
      id: '',
      name: '',
      urn: '',
      description: '',
      version: '',
      scheme: ''
    });
  }
  ngOnInit(): void {
    this.loadInitialData();
  }
 

}
