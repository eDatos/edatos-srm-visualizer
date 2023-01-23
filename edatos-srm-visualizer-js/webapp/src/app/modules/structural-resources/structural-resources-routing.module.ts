import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesSearchComponent } from './components/categories-search/categories-search.component';
import { CodelistsSearchComponent } from './components/codelists-search/codelists-search.component';
import { ConceptsSchemesDetailComponent } from '../concepts/components/concepts-schemes-detail/concepts-schemes-detail.component';
import { ConceptsSchemesSearchComponent } from '../concepts/components/concepts-schemes-search/concepts-schemes-search.component';
import { ConceptsSearchComponent } from '../concepts/components/concepts-search/concepts-search.component';
import { DsdSearchComponent } from './components/dsd-search/dsd-search.component';
import { NavigationSearchComponent } from './components/navigation-search/navigation-search.component';
import { OrganizationsSearchComponent } from './components/organizations-search/organizations-search.component';
import { CodelistComponent } from './components/codelists-search/codelist/codelist.component';


const routes: Routes = [
  {
    path: '',
    component: NavigationSearchComponent,
    children: [
      { path: '', redirectTo: 'concepts', pathMatch: 'full' },
      { path: 'concepts', loadChildren: () => import ('../concepts/concepts.module').then ( m => m.ConceptsModule)},
      { path: 'dsd', component: DsdSearchComponent },
      { path: 'organizations', component: OrganizationsSearchComponent },
      { path: 'categories', component: CategoriesSearchComponent },
      { path: 'classifications', component: CodelistComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuralResourcesRoutingModule { }
