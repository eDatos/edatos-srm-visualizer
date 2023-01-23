import { Component } from '@angular/core';
import { StructuralResources } from 'src/app/shared/models/enums/structural-resources';

@Component({
  selector: 'app-codelists-search',
  templateUrl: './codelists-search.component.html',
  styleUrls: ['./codelists-search.component.scss']
})
export class CodelistsSearchComponent {
  tab: string = StructuralResources.Codelists_Families;
  StructuralResources = StructuralResources;
  
  loadCodelist() {
    this.tab = StructuralResources.Codelists;
  }
  loadFamiliesCodelist() {
    this.tab = StructuralResources.Codelists_Families;
  }
  loadCodes() {
    this.tab = StructuralResources.Codelists_Codes;
  }

}
