import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StructuralResources } from 'src/app/shared/models/enums/structural-resources';


@Component({
  selector: 'app-concepts-search',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent {
  tab: string = StructuralResources.Concepts_Scheme;
  StructuralResources = StructuralResources;

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log('entra');
    console.log(router.url);
  }

  isRouteSchemeActive() {
    return this.router.url.match('/concepts/schemes')
  }

  isRouteConceptActive() {
    return this.router.url.match('/concepts/concepts')
  }


}
