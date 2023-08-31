import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DsdRoutingModule } from './dsd-routing.module';

import { DsdNavbarComponent } from './dsd-navbar/dsd-navbar.component';
import { CodesSearchComponent } from './codes/codes-search/codes-search.component';
import { CodesDetailComponent } from './codes/codes-detail/codes-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';


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
        DropdownModule,
        MenuModule,
        FormsModule,
        TabMenuModule,
        TableModule
    ]
})
export class DsdModule { }
