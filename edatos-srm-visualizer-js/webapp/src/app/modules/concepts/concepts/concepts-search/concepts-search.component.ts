import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConceptsApiService } from 'src/app/core/services/api/structural-resources/concepts-api.service';

import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';


@Component({
  selector: 'app-concepts-navbar-search',
  templateUrl: './concepts-search.component.html',
  styleUrls: ['./concepts-search.component.scss']
})
export class ConceptsSearchComponent extends BasicSearchComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, apiService: ConceptsApiService, private localeService: LocaleService) {
    super(apiService, localeService);

    this.searchForm = this.formBuilder.group({
      id: '',
      name: '',
      urn: '',
      description: ''
    });

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
