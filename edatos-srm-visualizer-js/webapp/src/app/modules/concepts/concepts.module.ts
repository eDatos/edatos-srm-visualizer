import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptsRoutingModule } from './concepts-routing.module';
import { ConceptsDetailComponent } from './components/concepts-detail/concepts-detail.component';
import { ConceptsSearchComponent } from './components/concepts-search/concepts-search.component';
import { ConceptsSchemesSearchComponent } from './components/concepts-schemes-search/concepts-schemes-search.component';
import { ConceptsSchemesDetailComponent } from './components/concepts-schemes-detail/concepts-schemes-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConceptsNavbarComponent } from './concepts-navbar/concepts-navbar.component';

@NgModule({
  declarations: [
    ConceptsDetailComponent,
    ConceptsSearchComponent,
    ConceptsSchemesSearchComponent,
    ConceptsSchemesDetailComponent,
    ConceptsNavbarComponent
  ],
  imports: [
    CommonModule,
    ConceptsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ConceptsModule { }
