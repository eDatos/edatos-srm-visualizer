import { Component } from '@angular/core';
import { StructuralResources } from 'src/app/shared/models/enums/structural-resources';

@Component({
  selector: 'app-organizations-search',
  templateUrl: './organizations-search.component.html',
  styleUrls: ['./organizations-search.component.scss']
})
export class OrganizationsSearchComponent {
  tab: string = StructuralResources.Organizations_Scheme;
  StructuralResources = StructuralResources;
  loadOrganizations() {
    this.tab = StructuralResources.Organizations;
  }
  loadOrganizationsScheme() {
    this.tab = StructuralResources.Organizations_Scheme;
  }

}
