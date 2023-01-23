import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocaleService } from 'src/app/core/services/locale.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { TableTreeComponent } from 'src/app/shared/components/table-tree/table-tree.component';
import { Constants } from 'src/app/shared/models/constants';
import { environment } from '../../../../../environments/environments';

@Component({
  selector: 'app-concepts-search',
  templateUrl: './concepts-search.component.html',
  styleUrls: ['./concepts-search.component.scss']
})
export class ConceptsSearchComponent extends BasicSearchComponent implements OnInit {



  constructor(private formBuilder: FormBuilder, apiService: ApiService, private localeService: LocaleService) {
    super(apiService, localeService);

    
    this.api = environment.apiUrlConcepts
    .replace('#AGENCY#', Constants.ALL)
    .replace('#RESOURCEID#', Constants.ALL)
    .replace('#VERSION#', Constants.LATEST)
    .replace('#ID#', '');
    
    this.apiDetail = environment.apiUrlConceptDetail;
    this.dataSearchPath = 'concept';

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
