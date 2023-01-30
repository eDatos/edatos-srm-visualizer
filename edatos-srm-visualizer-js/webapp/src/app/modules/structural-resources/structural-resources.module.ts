import { NgModule } from '@angular/core';

import { StructuralResourcesRoutingModule } from './structural-resources-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationSearchComponent } from './components/navigation-search/navigation-search.component';


@NgModule({
  declarations: [
    NavigationSearchComponent
  ],
  imports: [
    CommonModule,
    StructuralResourcesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StructuralResourcesModule { }
