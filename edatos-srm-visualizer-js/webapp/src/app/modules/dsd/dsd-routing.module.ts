import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodesDetailComponent } from './codes/codes-detail/codes-detail.component';
import { CodesSearchComponent } from './codes/codes-search/codes-search.component';
import { DsdNavbarComponent } from './dsd-navbar/dsd-navbar.component';



const routes: Routes = [
  {
    path: '', 
    component: DsdNavbarComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'codes' },
      { path: 'codes', component:  CodesSearchComponent},
      { path: 'codes/:agencyID/:resourceID/:version/detail', component:  CodesDetailComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DsdRoutingModule { }
