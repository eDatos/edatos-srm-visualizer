import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsNavbarComponent } from './organizations-navbar/organizations-navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SchemesSearchComponent } from './schemes/schemes-search/schemes-search.component';
import { SchemesDetailComponent } from './schemes/schemes-detail/schemes-detail.component';
import { OrganizationsDetailComponent } from './organizations/organizations-detail/organizations-detail.component';
import { OrganizationsSearchComponent } from './organizations/organizations-search/organizations-search.component';
import { AppModule } from '../../app.module';


@NgModule({
    declarations: [

        OrganizationsNavbarComponent,
        SchemesSearchComponent,
        SchemesDetailComponent,
        OrganizationsDetailComponent,
        OrganizationsSearchComponent
    ],
    imports: [
        CommonModule,
        OrganizationsRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class OrganizationsModule {
}
