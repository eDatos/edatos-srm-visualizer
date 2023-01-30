import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesNavbarComponent } from './categories-navbar/categories-navbar.component';
import { CategoriesSearchComponent } from './categories/categories-search/categories-search.component';
import { SchemesSearchComponent } from './schemes/schemes-search/schemes-search.component';

const routes: Routes = [
  {
    path: '', component: CategoriesNavbarComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'schemes' },
      { path: 'schemes', component: SchemesSearchComponent },
      { path: 'categories', component: CategoriesSearchComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
