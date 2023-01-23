import { Component } from '@angular/core';
import { StructuralResources } from 'src/app/shared/models/enums/structural-resources';

@Component({
  selector: 'app-categories-search',
  templateUrl: './categories-search.component.html',
  styleUrls: ['./categories-search.component.scss']
})
export class CategoriesSearchComponent {
  tab: string = StructuralResources.Categories_Scheme;
  StructuralResources = StructuralResources;

  loadCategories() {
    this.tab = StructuralResources.Categories;
  }
  loadcategoriesScheme() {
    this.tab = StructuralResources.Categories_Scheme;
  }
}
