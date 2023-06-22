import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesNavbarComponent } from './categories-navbar/categories-navbar.component';
import { CategoriesDetailComponent } from './categories/categories-detail/categories-detail.component';
import { CategoriesSearchComponent } from './categories/categories-search/categories-search.component';
import { SchemesDetailComponent } from './schemes/schemes-detail/schemes-detail.component';
import { SchemesSearchComponent } from './schemes/schemes-search/schemes-search.component';

const routes: Routes = [
  {
    path: '', component: CategoriesNavbarComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'categories' },
      { path: 'schemes', component: SchemesSearchComponent },
      { path: 'schemes/:agencyID/:resourceID/:version/detail', component: SchemesDetailComponent},
      { path: 'categories', component: CategoriesSearchComponent },
      { path: 'categories/:agencyID/:resourceID/:id/:version/detail', component: CategoriesDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
