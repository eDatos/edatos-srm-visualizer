import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-codelist-families',
  templateUrl: './codelist-families.component.html',
  styleUrls: ['./codelist-families.component.scss']
})
export class CodelistFamiliesComponent  extends BasicSearchComponent {
  updateDetailForm(): void {
    throw new Error('Method not implemented.');
  }

  constructor (private formBuilder: FormBuilder, apiService: ApiService) {
    super(apiService);

    this.api = environment.apiUrlCodeListsFamilies;
    this.dataSearchPath = 'codelistFamily';
    this.searchForm = this.formBuilder.group({
      id: '',
        name : '',
  urn: '',
      description: ''
    })
  }
     
}
