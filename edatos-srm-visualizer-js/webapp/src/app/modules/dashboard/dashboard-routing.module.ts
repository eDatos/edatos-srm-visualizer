import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructuralResourcesModule } from '../structural-resources/structural-resources.module';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'components/structural-resources', loadChildren: () => import ('../structural-resources/structural-resources.module').then (m => m.StructuralResourcesModule) }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
