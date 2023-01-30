import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


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
        link: 'codelists'
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

    this.activeLink = this.navLinks.filter(element => router.url.includes('/' + element.link))[0].label;
  }

}
