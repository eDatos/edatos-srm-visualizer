import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationSearchComponent } from './components/navigation-search/navigation-search.component';




const routes: Routes = [
  {
    path: '',
    component: NavigationSearchComponent,
    children: [
      { path: '', redirectTo: 'concepts', pathMatch: 'full' },
      { path: 'concepts', loadChildren: () => import ('../concepts/concepts.module').then ( m => m.ConceptsModule)},
      { path: 'dsd', loadChildren: () => import ('../dsd/dsd.module').then ( m => m.DsdModule)},
      { path: 'organizations', loadChildren: () => import ('../organizations/organizations.module').then ( m => m.OrganizationsModule)},
      { path: 'categories', loadChildren: () => import ('../categories/categories.module').then ( m => m.CategoriesModule)},
      { path: 'codelists', loadChildren: () => import ('../codelists/codelists.module').then ( m => m.CodelistsModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuralResourcesRoutingModule { }
