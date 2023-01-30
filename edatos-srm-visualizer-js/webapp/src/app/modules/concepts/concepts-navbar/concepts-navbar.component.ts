import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StructuralResources } from 'src/app/shared/models/enums/structural-resources';


@Component({
  selector: 'app-concepts-navbar-search',
  templateUrl: './concepts-navbar.component.html',
  styleUrls: ['./concepts-navbar.component.scss']
})
export class ConceptsNavbarComponent {

  tab: string = StructuralResources.Concepts_Scheme;
  StructuralResources = StructuralResources;
  
  constructor(private router: Router, private route: ActivatedRoute) {
  }
  
  isRouteActive(element: string) {
    return this.router.url.includes(element);
  }


}
