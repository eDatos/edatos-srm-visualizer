import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/structural-resources/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-schemes-search',
  templateUrl: './schemes-search.component.html',
  styleUrls: ['./schemes-search.component.scss']
})
export class SchemesSearchComponent extends BasicSearchComponent implements OnInit {

  @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;

  constructor(private formBuilder: FormBuilder, apiService: ApiService, private localeService: LocaleService) {
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
