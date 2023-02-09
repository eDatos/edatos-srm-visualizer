import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsNavbarComponent } from './organizations-navbar/organizations-navbar.component';
import { OrganizationsDetailComponent } from './organizations/organizations-detail/organizations-detail.component';
import { OrganizationsSearchComponent } from './organizations/organizations-search/organizations-search.component';
import { SchemesDetailComponent } from './schemes/schemes-detail/schemes-detail.component';
import { SchemesSearchComponent } from './schemes/schemes-search/schemes-search.component';

const routes: Routes = [{
  path: '', component: OrganizationsNavbarComponent,
  children:[
    { path: '', pathMatch: 'full', redirectTo: 'schemes' },
    { path: 'schemes', component:  SchemesSearchComponent},
    { path: 'schemes/:agencyID/:resourceID/:version/detail', component:  SchemesDetailComponent},
    { path: 'organizations', component:  OrganizationsSearchComponent},
    { path: 'organizations/:agencyID/:resourceID/:id/:version/detail', component:  OrganizationsDetailComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
