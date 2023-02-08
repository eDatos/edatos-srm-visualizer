import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizations-navbar',
  templateUrl: './organizations-navbar.component.html',
  styleUrls: ['./organizations-navbar.component.scss']
})
export class OrganizationsNavbarComponent {

  constructor(private router: Router) {};
  
  isRouteActive(element: string) {
    return this.router.url.includes('/organizations/' + element);
  }

}
