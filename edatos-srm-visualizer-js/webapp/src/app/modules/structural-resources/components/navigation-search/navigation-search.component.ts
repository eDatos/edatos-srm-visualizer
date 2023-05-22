import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navigation-search',
  templateUrl: './navigation-search.component.html',
  styleUrls: ['./navigation-search.component.scss']
})
export class NavigationSearchComponent {
  public navLinks: any[];
  public activeLink: string;

  constructor(private router: Router, private route: ActivatedRoute, private translateService: TranslateService) {
    this.navLinks = [
      {
        label: this.translateService.instant('concepts.concepts'),
        link: 'concepts'
      }, {
        label: this.translateService.instant('codelists.codelists'),
        link: 'codelists'
      }, {
        label: this.translateService.instant('dsd.definitionDataStructures'),
        link: 'dsd'
      }, {
        label: this.translateService.instant('organizations.organizations'),
        link: 'organizations'
      }, {
        label: this.translateService.instant('category.categories'),
        link: 'categories'
      }
    ];

    this.activeLink = this.navLinks.filter(element => router.url.includes('/' + element.link))[0].label;
  }

}
