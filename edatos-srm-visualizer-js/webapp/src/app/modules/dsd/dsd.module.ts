import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DsdRoutingModule } from './dsd-routing.module';

import { DsdNavbarComponent } from './dsd-navbar/dsd-navbar.component';
import { CodesSearchComponent } from './codes/codes-search/codes-search.component';
import { CodesDetailComponent } from './codes/codes-detail/codes-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DsdNavbarComponent,
    CodesSearchComponent,
    CodesDetailComponent
  ],
  imports: [
    CommonModule,
    DsdRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DsdModule { }
