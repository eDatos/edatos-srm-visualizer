import { NgModule } from '@angular/core';

import { StructuralResourcesRoutingModule } from './structural-resources-routing.module';
import { ConceptsComponent } from '../concepts/concepts/concepts.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CodelistsSearchComponent } from './components/codelists-search/codelists-search.component';
import { NavigationSearchComponent } from './components/navigation-search/navigation-search.component';
import { CodelistFamiliesComponent } from './components/codelists-search/codelist-families/codelist-families.component';
import { CodelistComponent } from './components/codelists-search/codelist/codelist.component';
import { CodesComponent } from './components/codelists-search/codes/codes.component';
import { DsdSearchComponent } from './components/dsd-search/dsd-search.component';
import { OrganizationsSearchComponent } from './components/organizations-search/organizations-search.component';
import { CategoriesSearchComponent } from './components/categories-search/categories-search.component';
import { DsdComponent } from './components/dsd-search/dsd/dsd.component';
import { OrganizationsComponent } from './components/organizations-search/organizations/organizations.component';
import { OrganizationsSchemeComponent } from './components/organizations-search/organizations-scheme/organizations-scheme.component';
import { CategoriesSchemeComponent } from './components/categories-search/categories-scheme/categories-scheme.component';
import { CategoriesComponent } from './components/categories-search/categories/categories.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    ConceptsComponent,
    CodelistsSearchComponent,
    NavigationSearchComponent,
    CodelistFamiliesComponent,
    CodelistComponent,
    CodesComponent,
    DsdSearchComponent,
    OrganizationsSearchComponent,
    CategoriesSearchComponent,
    DsdComponent,
    OrganizationsComponent,
    OrganizationsSchemeComponent,
    CategoriesSchemeComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    StructuralResourcesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StructuralResourcesModule { }
