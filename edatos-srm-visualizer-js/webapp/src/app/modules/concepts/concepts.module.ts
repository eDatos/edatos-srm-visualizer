import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptsRoutingModule } from './concepts-routing.module';
import { ConceptsDetailComponent } from './concepts/concepts-detail/concepts-detail.component';
import { ConceptsSearchComponent } from './concepts/concepts-search/concepts-search.component';
import { ConceptsSchemesSearchComponent } from './schemes/concepts-schemes-search/concepts-schemes-search.component';
import { ConceptsSchemesDetailComponent } from './schemes/concepts-schemes-detail/concepts-schemes-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConceptsNavbarComponent } from './concepts-navbar/concepts-navbar.component';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';

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
        ReactiveFormsModule,
        SharedModule,
        DropdownModule,
        FormsModule,
        TabMenuModule,
        TableModule,
        MenuModule
    ]
})
export class ConceptsModule {
}
