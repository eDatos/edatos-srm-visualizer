import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dsd-navbar',
  templateUrl: './dsd-navbar.component.html',
  styleUrls: ['./dsd-navbar.component.scss']
})
export class DsdNavbarComponent {

  public navLinks: MenuItem[];
  public activeLink: MenuItem;
  
  constructor(private router: Router, private translateService: TranslateService) {

    this.navLinks = [
      {
          label: this.translateService.instant('dsd.datastructures'), routerLink: ['codes'] 
      }
    ];

    this.activeLink = this.navLinks[0];
  };
  
  isRouteActive(element: string) {
    return this.router.url.split('/').pop()?.match(element);
  }

}
