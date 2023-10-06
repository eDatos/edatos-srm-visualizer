import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codelists-navbar',
  templateUrl: './codelists-navbar.component.html',
  styleUrls: ['./codelists-navbar.component.scss']
})
export class CodelistsNavbarComponent {

  constructor(private router: Router) {};
  
  isRouteActive(element: string) {
    return this.router.url.includes('codelists/' + element);
  }

}
