import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationsRoutingModule } from './organisations-routing.module';
import { OrganisationsNavbarComponent } from './organisations-navbar/organisations-navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemesSearchComponent } from './schemes/schemes-search/schemes-search.component';
import { SchemesDetailComponent } from './schemes/schemes-detail/schemes-detail.component';
import { OrganisationsDetailComponent } from './organisations/organisations-detail/organisations-detail.component';
import { OrganisationsSearchComponent } from './organisations/organisations-search/organisations-search.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';


@NgModule({
    declarations: [

        OrganisationsNavbarComponent,
        SchemesSearchComponent,
        SchemesDetailComponent,
        OrganisationsDetailComponent,
        OrganisationsSearchComponent
    ],
    imports: [
        CommonModule,
        OrganisationsRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MenuModule,
        TabMenuModule,
        DropdownModule,
        FormsModule
    ]
})
export class OrganisationsModule {
}
