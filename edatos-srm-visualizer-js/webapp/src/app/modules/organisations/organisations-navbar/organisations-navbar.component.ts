import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organisations-navbar',
  templateUrl: './organisations-navbar.component.html',
  styleUrls: ['./organisations-navbar.component.scss']
})
export class OrganisationsNavbarComponent {

  constructor(private router: Router) {};
  
  isRouteActive(element: string) {
    return this.router.url.includes('/organisations/' + element);
  }

}
