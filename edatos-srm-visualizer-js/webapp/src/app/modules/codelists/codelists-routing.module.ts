import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodelistsNavbarComponent} from './codelists-navbar/codelists-navbar.component';
import { CodelistSearchComponent } from './codelists/codelist-search/codelist-search.component';
import { CodeSearchComponent } from './codes/code-search/code-search.component';
import { FamilyDetailComponent } from './families/family-detail/family-detail.component';
import { FamilySearchComponent } from './families/family-search/family-search.component';

const routes: Routes = [{
  path: '', component: CodelistsNavbarComponent,
  children: [
    { path: '', redirectTo: 'families', pathMatch: 'full' },
    { path: 'families', component: FamilySearchComponent },
    { path: 'families/:idFamily/detail', component: FamilyDetailComponent },
    { path: 'codelists', component: CodelistSearchComponent },
    { path: 'codes', component: CodeSearchComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodelistsRoutingModule { }
