import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-family-search',
  templateUrl: './family-search.component.html',
  styleUrls: ['./family-search.component.scss']
})
export class FamilySearchComponent extends BasicSearchComponent implements OnInit {

  @ViewChild('tabletreenode') tabletreenode!: TableTreeComponent;

  constructor(private formBuilder: FormBuilder, apiService: ApiService, private localeService: LocaleService) {
    super(apiService, localeService);

    
    this.api = environment.apiUrlCodeListsFamilies;
    this.apiDetail = environment.apiUrlCodeListsFamiliesDetail;
    this.dataSearchPath = 'codelistFamily';
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
 

  updateDetailForm(): void {
    console.log (this.dataDetail);
    this.detailForm.patchValue({
      id: this.dataDetail!.id,
      urn: this.dataDetail!.urn,
      name: this.dataDetail!.name,
      description: this.dataDetail!.description
    })
  }
}
