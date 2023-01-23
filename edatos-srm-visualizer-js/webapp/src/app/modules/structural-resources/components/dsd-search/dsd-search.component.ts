import { Component } from '@angular/core';
import { StructuralResources } from 'src/app/shared/models/enums/structural-resources';

@Component({
  selector: 'app-dsd-search',
  templateUrl: './dsd-search.component.html',
  styleUrls: ['./dsd-search.component.scss']
})
export class DsdSearchComponent {
  tab: string = StructuralResources.DSD;
  StructuralResources = StructuralResources;


  loadDSD() {
    this.tab = StructuralResources.DSD;
  }
}
