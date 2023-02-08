import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsNavbarComponent } from './organizations-navbar/organizations-navbar.component';
import { OrganizationsSearchComponent } from './organizations/organizations-search/organizations-search.component';
import { SchemesSearchComponent } from './schemes/schemes-search/schemes-search.component';

const routes: Routes = [{
  path: '', component: OrganizationsNavbarComponent,
  children:[
    { path: '', pathMatch: 'full', redirectTo: 'schemes' },
    { path: 'schemes', component:  SchemesSearchComponent},
    { path: 'organizations', component:  OrganizationsSearchComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
