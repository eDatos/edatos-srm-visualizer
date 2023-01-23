import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { BasicSearchComponent } from 'src/app/shared/components/basic-search/basic-search.component';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BasicSearchComponent{
  updateDetailForm(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private formBuilder: FormBuilder, apiService: ApiService) {
    super(apiService);

    this.api = environment.apiUrlCategories;
    this.dataSearchPath = 'category';
    this.searchForm = this.formBuilder.group({
      id: '',
      name: '',
      urn: '',
      description: ''
    })
  }

}
