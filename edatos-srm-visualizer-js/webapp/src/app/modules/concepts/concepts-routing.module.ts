import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConceptsDetailComponent } from './concepts/concepts-detail/concepts-detail.component';
import { ConceptsSchemesDetailComponent } from './schemes/concepts-schemes-detail/concepts-schemes-detail.component';
import { ConceptsSchemesSearchComponent } from './schemes/concepts-schemes-search/concepts-schemes-search.component';
import { ConceptsSearchComponent } from './concepts/concepts-search/concepts-search.component';
import { ConceptsNavbarComponent } from './concepts-navbar/concepts-navbar.component';

const routes: Routes = [{
  path: '', component: ConceptsNavbarComponent,
  children: [
    { path: '', redirectTo: 'concepts', pathMatch: 'full' },
    { path: 'schemes', component: ConceptsSchemesSearchComponent },
    { path: 'schemes/:agencyID/:resourceID/:version/detail', component: ConceptsSchemesDetailComponent },
    { path: 'concepts', component: ConceptsSearchComponent },
    { path: 'concepts/:agencyID/:resourceID/:id/:version/detail', component: ConceptsDetailComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptsRoutingModule { }
