import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesNavbarComponent } from './categories-navbar/categories-navbar.component';
import { SchemesSearchComponent } from './schemes/schemes-search/schemes-search.component';
import { SchemesDetailComponent } from './schemes/schemes-detail/schemes-detail.component';
import { CategoriesDetailComponent } from './categories/categories-detail/categories-detail.component';
import { CategoriesSearchComponent } from './categories/categories-search/categories-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesNavbarComponent,
    SchemesSearchComponent,
    SchemesDetailComponent,
    CategoriesDetailComponent,
    CategoriesSearchComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
