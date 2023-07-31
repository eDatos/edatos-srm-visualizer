import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationsNavbarComponent } from './organisations-navbar/organisations-navbar.component';
import { OrganisationsDetailComponent } from './organisations/organisations-detail/organisations-detail.component';
import { OrganisationsSearchComponent } from './organisations/organisations-search/organisations-search.component';
import { SchemesDetailComponent } from './schemes/schemes-detail/schemes-detail.component';
import { SchemesSearchComponent } from './schemes/schemes-search/schemes-search.component';

const routes: Routes = [{
  path: '', component: OrganisationsNavbarComponent,
  children:[
    { path: '', pathMatch: 'full', redirectTo: 'organisations' },
    { path: 'schemes', component:  SchemesSearchComponent},
    { path: 'schemes/:agencyID/:resourceID/:version/detail', component:  SchemesDetailComponent},
    { path: 'organisations', component:  OrganisationsSearchComponent},
    { path: 'organisations/:agencyID/:resourceID/:id/:version/detail', component:  OrganisationsDetailComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationsRoutingModule { }
