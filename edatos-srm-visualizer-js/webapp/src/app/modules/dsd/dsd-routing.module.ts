import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodesSearchComponent } from './codes/codes-search/codes-search.component';
import { DsdNavbarComponent } from './dsd-navbar/dsd-navbar.component';



const routes: Routes = [
  {
    path: '', 
    component: DsdNavbarComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'codes' },
      { path: 'codes', component:  CodesSearchComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DsdRoutingModule { }
