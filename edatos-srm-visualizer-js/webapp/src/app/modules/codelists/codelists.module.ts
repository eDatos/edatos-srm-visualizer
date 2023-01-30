import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodelistsRoutingModule } from './codelists-routing.module';
import { CodelistsNavbarComponent } from './codelists-navbar/codelists-navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FamilyDetailComponent } from './families/family-detail/family-detail.component';
import { FamilySearchComponent } from './families/family-search/family-search.component';
import { CodelistSearchComponent } from './codelists/codelist-search/codelist-search.component';
import { CodelistDetailComponent } from './codelists/codelist-detail/codelist-detail.component';
import { CodeDetailComponent } from './codes/code-detail/code-detail.component';
import { CodeSearchComponent } from './codes/code-search/code-search.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CodelistsNavbarComponent,
    FamilyDetailComponent,
    FamilySearchComponent,
    CodelistSearchComponent,
    CodelistDetailComponent,
    CodeDetailComponent,
    CodeSearchComponent
  ],
  imports: [
    CommonModule,
    CodelistsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CodelistsModule { }
