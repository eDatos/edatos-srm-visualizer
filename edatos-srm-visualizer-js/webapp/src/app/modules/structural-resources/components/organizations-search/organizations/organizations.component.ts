import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent  extends BasicSearchComponent {
  updateDetailForm(): void {
    throw new Error('Method not implemented.');
  }


  constructor (private formBuilder: FormBuilder, apiService: ApiService) {
    super(apiService);
    
    this.api = environment.apiUrlOrganizations;
    this.dataSearchPath = 'organisation';
    this.searchForm = this.formBuilder.group({
      latest: '',
      id: '',
      name : '',
      urn: '',
      description: ''
    })
  }
  
}
