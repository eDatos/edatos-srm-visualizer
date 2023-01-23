import { Component, EventEmitter, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { StructuralResources } from 'src/app/shared/models/enums/structural-resources';

@Component({
  selector: 'app-navigation-search',
  templateUrl: './navigation-search.component.html',
  styleUrls: ['./navigation-search.component.scss']
})
export class NavigationSearchComponent {
  navLinks: any[];
  activeLink: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.navLinks = [
      {
        label: 'Conceptos',
        link: 'concepts'
      }, {
        label: 'Clasificaciones',
        link: 'classifications'
      }, {
        label: 'Definición de Estructuras de Datos(DSD)',
        link: 'dsd'
      }, {
        label: 'Organizaciones',
        link: 'organizations'
      }, {
        label: 'Temas',
        link: 'categories'
      }
    ];
    this.activeLink = this.navLinks[0].label;
  }

}
