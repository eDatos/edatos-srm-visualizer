import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-dsd',
  templateUrl: './dsd.component.html',
  styleUrls: ['./dsd.component.scss']
})
export class DsdComponent  extends BasicSearchComponent  {
  updateDetailForm(): void {
    throw new Error('Method not implemented.');
  }

  constructor (private formBuilder: FormBuilder, apiService: ApiService) {
    super(apiService);

    this.api = environment.apiUrlDSD;
    this.dataSearchPath = 'dataStructure';
    this.searchForm = this.formBuilder.group({
      id: '',
        name : '',
  urn: '',
      description: ''
    })
  }
  
}
