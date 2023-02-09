import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodelistsNavbarComponent} from './codelists-navbar/codelists-navbar.component';
import { CodelistDetailComponent } from './codelists/codelist-detail/codelist-detail.component';
import { CodelistSearchComponent } from './codelists/codelist-search/codelist-search.component';
import { CodeDetailComponent } from './codes/code-detail/code-detail.component';
import { CodeSearchComponent } from './codes/code-search/code-search.component';
import { FamilyDetailComponent } from './families/family-detail/family-detail.component';
import { FamilySearchComponent } from './families/family-search/family-search.component';

const routes: Routes = [{
  path: '', component: CodelistsNavbarComponent,
  children: [
    { path: '', redirectTo: 'families', pathMatch: 'full' },
    { path: 'families', component: FamilySearchComponent },
    { path: 'families/:id/detail', component: FamilyDetailComponent },
    { path: 'codelists', component: CodelistSearchComponent },
    { path: 'codelists/:agencyID/:resourceID/:version/detail', component: CodelistDetailComponent },
    { path: 'codes', component: CodeSearchComponent },
    { path: 'codes/:agencyID/:resourceID/:id/:version/detail', component: CodeDetailComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodelistsRoutingModule { }
